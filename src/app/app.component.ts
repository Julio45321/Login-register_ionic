import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './servicios/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private servicio:AuthService,
    private ruta:Router
  ) {}


  salir(){
    this.servicio.logout()
  this.ruta.navigateByUrl('/login')
  }
}
