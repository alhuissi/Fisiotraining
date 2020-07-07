import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicRatingModule } from 'ionic4-rating';
import { IonicModule } from '@ionic/angular';

import { HacerEvaluacionDiariaPage } from './hacer-evaluacion-diaria.page';

const routes: Routes = [
  {
    path: '',
    component: HacerEvaluacionDiariaPage
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
  declarations: [HacerEvaluacionDiariaPage]
})
export class HacerEvaluacionDiariaPageModule {}
