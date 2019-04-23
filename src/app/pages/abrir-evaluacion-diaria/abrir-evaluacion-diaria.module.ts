import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicRatingModule } from 'ionic4-rating';

import { IonicModule } from '@ionic/angular';

import { AbrirEvaluacionDiariaPage } from './abrir-evaluacion-diaria.page';

const routes: Routes = [
  {
    path: '',
    component: AbrirEvaluacionDiariaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicRatingModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AbrirEvaluacionDiariaPage]
})
export class AbrirEvaluacionDiariaPageModule {}
