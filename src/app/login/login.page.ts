import { AuthService } from './../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from './../Models/Usuario';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: Usuario = {
    email: '',
    password: '',
  };

  constructor(private servicio: AuthService, private ruta: Router) {}

  ngOnInit() {}

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      width: 600,
      heightAuto: false,
      text: 'Espere por favor...',
    });
    Swal.showLoading();

    this.servicio.login(this.usuario).subscribe(
      (resp) => {
        Swal.close();
        this.ruta.navigateByUrl('/inicio');
      },
      (err) => {
        console.error(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message,
          heightAuto: false,
        });
      }
    );
  }
}
