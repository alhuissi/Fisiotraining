import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicRatingModule } from 'ionic4-rating';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilKinePage } from './perfil-kine.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilKinePage
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
  declarations: [PerfilKinePage]
})
export class PerfilKinePageModule {}
