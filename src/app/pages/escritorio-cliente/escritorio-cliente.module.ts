import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EscritorioClientePage } from './escritorio-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: EscritorioClientePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EscritorioClientePage]
})
export class EscritorioClientePageModule {}
