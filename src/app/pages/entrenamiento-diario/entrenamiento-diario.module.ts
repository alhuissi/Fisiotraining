import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EntrenamientoDiarioPage } from './entrenamiento-diario.page';

const routes: Routes = [
  {
    path: '',
    component: EntrenamientoDiarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EntrenamientoDiarioPage]
})
export class EntrenamientoDiarioPageModule {}
