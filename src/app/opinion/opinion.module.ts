import { ComponentesModule } from './../componentes/componentes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpinionPageRoutingModule } from './opinion-routing.module';

import { OpinionPage } from './opinion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpinionPageRoutingModule,
    ComponentesModule,
  ],
  declarations: [OpinionPage],
})
export class OpinionPageModule {}
