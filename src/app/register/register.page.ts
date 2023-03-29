import { Router } from '@angular/router';
import { AuthService } from './../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../Models/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuario: Usuario = {
    email: '',
    password: '',
  };

  constructor(private servicio: AuthService, private ruta: Router) {}
  ngOnInit() {}

  registrar(form: NgForm) {
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

    this.servicio.registrar(this.usuario).subscribe(
      (resp) => {
        Swal.close();
        this.ruta.navigateByUrl('/inicio');
      },
      (err) => {
        console.error(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: err.error.error.message,
          heightAuto: false,
        });
      }
    );
  }
}
