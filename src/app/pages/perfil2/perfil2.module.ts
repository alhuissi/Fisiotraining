import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicRatingModule } from 'ionic4-rating';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Perfil2Page } from './perfil2.page';

const routes: Routes = [
  {
    path: '',
    component: Perfil2Page
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
  declarations: [Perfil2Page]
})
export class Perfil2PageModule {}
