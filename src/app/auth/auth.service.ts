import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { Storage } from '@capacitor/storage';

export interface DatosAutenticacion {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private _user = new BehaviorSubject<User>(null);
  private tiempoActivo: any;

  get usuarioAutenticado() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  constructor(private http: HttpClient) {}

  autoLogin() {
    return from(Storage.get({ key: 'authData' })).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          token: string;
          expiracionToken: string;
          userId: string;
          email: string;
        };
        const tiempoExpiracion = new Date(parsedData.expiracionToken);
        if (tiempoExpiracion <= new Date()) {
          return null;
        }
        const user = new User(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          tiempoExpiracion
        );
        return user;
      }),
      tap(user => {
        if (user) {
          this._user.next(user);
          this.autoCerrarSesion(user.duracionToken);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }

  registrar(email: string, password: string) {
    return this.http
      .post<DatosAutenticacion>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${environment.firebaseAPIKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(tap(this.setDatosUsuario.bind(this)));
  }

  iniciarSesion(email: string, password: string) {
    return this.http
      .post<DatosAutenticacion>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(tap(this.setDatosUsuario.bind(this)));
  }

  cerrarSesion() {
    if (this.tiempoActivo) {
      clearTimeout(this.tiempoActivo);
    }
    this._user.next(null);
    Storage.remove({key: 'authData'});
  }

  ngOnDestroy() {
    if (this.tiempoActivo) {
      clearTimeout(this.tiempoActivo);
    }
  }

  private autoCerrarSesion(duration: number) {
    if (this.tiempoActivo) {
      clearTimeout(this.tiempoActivo);
    }
    this.tiempoActivo = setTimeout(() => {
      this.cerrarSesion();
    }, duration);
  }

  private setDatosUsuario(datosUsuario: DatosAutenticacion) {
    const tiempoExpiracion = new Date(
      new Date().getTime() + +datosUsuario.expiresIn * 1000
    );
    const user = new User(
      datosUsuario.localId,
      datosUsuario.email,
      datosUsuario.idToken,
      tiempoExpiracion
    );
    this._user.next(user);
    this.autoCerrarSesion(user.duracionToken);
    this.almacenAuthData(
      datosUsuario.localId,
      datosUsuario.idToken,
      tiempoExpiracion.toISOString(),
      datosUsuario.email
    );
  }

  private almacenAuthData(
    userId: string,
    token: string,
    expiracionToken: string,
    email: string
  ) {
    const data = JSON.stringify({ userId, token, expiracionToken, email });
    Storage.set({ key: 'authData', value: data });
  }
}
