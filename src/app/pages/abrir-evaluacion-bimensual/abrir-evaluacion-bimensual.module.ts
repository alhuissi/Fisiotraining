import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AbrirEvaluacionBimensualPage } from './abrir-evaluacion-bimensual.page';

const routes: Routes = [
  {
    path: '',
    component: AbrirEvaluacionBimensualPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AbrirEvaluacionBimensualPage]
})
export class AbrirEvaluacionBimensualPageModule {}
