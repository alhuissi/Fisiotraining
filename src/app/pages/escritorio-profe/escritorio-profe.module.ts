import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EscritorioProfePage } from './escritorio-profe.page';

const routes: Routes = [
  {
    path: '',
    component: EscritorioProfePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EscritorioProfePage]
})
export class EscritorioProfePageModule {}
