import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EscritorioAdminPage } from './escritorio-admin.page';

const routes: Routes = [
  {
    path: '',
    component: EscritorioAdminPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EscritorioAdminPage]
})
export class EscritorioAdminPageModule {}
