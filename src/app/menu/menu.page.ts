import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  indiceSeleccionado: number = 0

  paginas = [
    {
      titulo:'Inicio',
      url:'/menu/inicio',
      icono:'home'
    },

  ]

  constructor(public alertController:AlertController,
    public navCtrl:NavController) { }

  ngOnInit() {
  }

  cambiarIndiceSeleccionado(i:any){
    this.indiceSeleccionado = i;
  }

  async salir(){
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Estas seguro que deseas salir?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {

          }
        }, {
          text: 'Sii',
          handler: () => {
            localStorage.removeItem('ingresado');
            this.navCtrl.navigateRoot('login');
          }
        }
      ]
    });

    await alert.present();
  }
}
