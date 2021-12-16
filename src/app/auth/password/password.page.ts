import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  constructor(private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);
  }

  login(){
    this.alertCtrl
              .create({
                header: 'Correo Enviado',
                message: 'Se ha enviado un enlace a su correo para restablecer su contraseña',
                buttons: [
                  {
                    text: 'Ok',
                    handler: () => {
                      this.router.navigate(['/auth']);
                    },
                  },
                ],
              })
              .then((alertEl) => alertEl.present());
  }

}
