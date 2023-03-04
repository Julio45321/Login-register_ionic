import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  progress: number = 0;

  constructor(
    private servicio:AuthService,
    private ruta:Router,
    public menu:MenuController
  ) { }

  ngOnInit() {
    setInterval(() => {
      if (this.progress < 100) {
        this.progress++;
      }
    }, 50);


  }

  salir(){
    this.servicio.logout()
  this.ruta.navigateByUrl('/login')
  }

  llamarMenu(){
    this.menu.open("menuControl");
  }
}
