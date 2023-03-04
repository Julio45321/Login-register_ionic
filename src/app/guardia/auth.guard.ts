import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private servicio:AuthService,
    private ruta:Router
  ){}

  canActivate(): boolean {
    if(this.servicio.autenticado()){
      return true
    }else{
      this.ruta.navigateByUrl('/login')
      return false
    }
  }
}
