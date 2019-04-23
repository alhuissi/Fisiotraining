import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HacerEvaluacionBimensualPage } from './hacer-evaluacion-bimensual.page';

const routes: Routes = [
  {
    path: '',
    component: HacerEvaluacionBimensualPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HacerEvaluacionBimensualPage]
})
export class HacerEvaluacionBimensualPageModule {}
