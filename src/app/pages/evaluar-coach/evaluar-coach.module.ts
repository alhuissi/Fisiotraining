import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicRatingModule } from 'ionic4-rating';

import { IonicModule } from '@ionic/angular';

import { EvaluarCoachPage } from './evaluar-coach.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluarCoachPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicRatingModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EvaluarCoachPage]
})
export class EvaluarCoachPageModule {}
