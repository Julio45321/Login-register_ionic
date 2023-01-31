import { ComponentesModule } from './../componentes/componentes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPageRoutingModule } from './editar-routing.module';

import { EditarPage } from './editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPageRoutingModule,
    ComponentesModule
  ],
  declarations: [EditarPage]
})
export class EditarPageModule {}
