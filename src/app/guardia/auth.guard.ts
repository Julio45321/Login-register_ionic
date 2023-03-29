import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './../servicios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private servicio: AuthService, private ruta: Router) {}

  canActivate(): boolean {
    if (this.servicio.autenticado()) {
      return true;
    } else {
      this.ruta.navigateByUrl('/login');
      return false;
    }
  }
}
