import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EscritorioVisitaPage } from './escritorio-visita.page';

const routes: Routes = [
  {
    path: '',
    component: EscritorioVisitaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EscritorioVisitaPage]
})
export class EscritorioVisitaPageModule {}
