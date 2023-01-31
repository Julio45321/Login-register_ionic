import { IngresadoGuard } from './ingresado.guard';
import { NoIngresadoGuard } from './no-ingresado.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate:[NoIngresadoGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canActivate:[NoIngresadoGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule),
    canActivate:[IngresadoGuard]
  },
  {
    path: 'agregar',
    loadChildren: () => import('./agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'datos',
    loadChildren: () => import('./datos/datos.module').then( m => m.DatosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
