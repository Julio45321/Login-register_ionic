import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validator,
  FormBuilder,
  Validators
} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin:FormGroup;

  constructor(
    public fb:FormBuilder,
    public alertController:AlertController,
    public navCtrl:NavController
  ) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

  async Ingresar(){
    var f = this.formularioLogin.value;
    var usuario = JSON.parse(localStorage.getItem('usuario')!);

     if(usuario.nombre == f.nombre && usuario.password == f.password){
       console.log('ingresado')
       localStorage.setItem('ingresado','true')
       this.navCtrl.navigateRoot('menu/inicio')
     }else{
      const alert = await this.alertController.create({
        header:'Alerta Datos Incorrectos',
        message:'Tus datos son incorrectos, verficalos por favor',
        buttons: ['Aceptar']
       })
       await alert.present()
     }
  }
}
