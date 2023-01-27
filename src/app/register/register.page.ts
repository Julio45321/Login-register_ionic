import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validator,
  FormBuilder,
  Validators
} from '@angular/forms'
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formularioRegistro:FormGroup;

  constructor( public fb:FormBuilder,
    public alertController: AlertController,
    public navCtrl:NavController

    ) {

    this.formularioRegistro= this.fb.group({
      'nombre':new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'confirmarPassword': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }
async guardar(){

  var f = this.formularioRegistro.value
  if(this.formularioRegistro.invalid){
   const alert = await this.alertController.create({
    header:'Alerta Datos Incompletos',
    message:'Tienes que llenar todos los datos',
    buttons: ['Aceptar']
   })
   await alert.present()
   return
  }

  var usuario = {
    nombre: f.nombre,
    password: f.password,
  }
  localStorage.setItem('usuario',JSON.stringify(usuario))
  localStorage.setItem('ingresado','true')
  this.navCtrl.navigateRoot('menu/inicio')
}
}
