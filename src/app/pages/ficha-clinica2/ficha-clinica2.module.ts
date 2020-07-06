import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FichaClinica2Page } from './ficha-clinica2.page';

const routes: Routes = [
  {
    path: '',
    component: FichaClinica2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FichaClinica2Page]
})
export class FichaClinica2PageModule {}
