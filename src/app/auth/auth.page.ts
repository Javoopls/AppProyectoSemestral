import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService, DatosAutenticacion } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  autenticar(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Iniciando Sesión...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<DatosAutenticacion>;
        if (this.isLogin) {
          authObs = this.authService.iniciarSesion(email, password);
        } else {
          authObs = this.authService.registrar(email, password);
        }
        authObs.subscribe(
          resData => {
            // console.log(resData);
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/viajes/tabs/pedir');
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'No se pudo registrar, intente nuevamente';
            if (code === 'EMAIL_EXISTS') {
              message = 'Este correo ya existe!';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'Correo o Contraseña inválidos';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'Correo o Contraseña inválidos';
            }
            this.mostrarAlert(message);
          }
        );
      });
  }

  restablecerPass(){
    this.router.navigate(['/password']);
  }

  cambiarModo() {
    this.isLogin = !this.isLogin;
  }

  valFormulario(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.autenticar(email, password);
    form.reset();
  }

  private mostrarAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Autenticación Fallida',
        message,
        buttons: ['Ok']
      })
      .then(alertEl => alertEl.present());
  }

}
