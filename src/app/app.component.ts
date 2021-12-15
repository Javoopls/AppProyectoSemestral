import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  private authSub: Subscription;
  private previoAutenticacion = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSub = this.authService.usuarioAutenticado.subscribe(autenticado => {
      if (!autenticado && this.previoAutenticacion !== autenticado) {
        this.router.navigateByUrl('/auth');
      }
      this.previoAutenticacion = autenticado;
    });
  }

  cerrarSesion(){
    this.authService.cerrarSesion();
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
