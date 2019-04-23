import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EstadisticasGlobalesPage } from './estadisticas-globales.page';

const routes: Routes = [
  {
    path: '',
    component: EstadisticasGlobalesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EstadisticasGlobalesPage]
})
export class EstadisticasGlobalesPageModule {}
