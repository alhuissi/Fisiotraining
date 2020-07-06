import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HacerEvaluacionDiariaFmsPage } from './hacer-evaluacion-diaria-fms.page';

const routes: Routes = [
  {
    path: '',
    component: HacerEvaluacionDiariaFmsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HacerEvaluacionDiariaFmsPage]
})
export class HacerEvaluacionDiariaFmsPageModule {}
