import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { InicioService } from '../servicios/inicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  progress1: number = 0;
  progress2: number = 0;
  latestData: any = {};

  constructor(
    private inicioService: InicioService,
    private servicio: AuthService,
    public menu: MenuController,
    private ruta: Router
  ) {}

  ngOnInit() {
    this.inicioService.getProgressBar().subscribe((res) => {
      const entries = Object.entries(res);

      //Obtenemos el ultimos dato registrado por el sensor
      this.latestData = entries[entries.length - 1];

      //Asignamos los datos
      this.progress1 = this.latestData[1].contenedor1;
      this.progress2 = this.latestData[1].contenedor2;
    });
  }

  salir() {
    this.servicio.logout();
    this.ruta.navigateByUrl('/login');
  }

  llamarMenu() {
    this.menu.open('menuControl');
  }
}
