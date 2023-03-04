import { AuthService } from './../servicios/auth.service';
import { Usuario } from './../Models/Usuario';
import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario:Usuario={
    email:'',
    password:''
  };

  constructor(
    private servicio:AuthService,
    private ruta:Router

  ) {

  }

  ngOnInit() {
  }

  login(form:NgForm){
    if(form.invalid){
      return
    }

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      width:600,
      heightAuto:false,
      text:"Espere por favor..."
    })
    Swal.showLoading()

    this.servicio.login(this.usuario)
    .subscribe(resp=>{
      console.log(resp);
      Swal.close()

      this.ruta.navigateByUrl('/inicio')
    },err=>{
      console.log(err.error.error.message);
      Swal.fire({
        icon:'error',
        title:"Error al autenticar",
        text:err.error.error.message,
        heightAuto:false
      })
    })
  }




}
