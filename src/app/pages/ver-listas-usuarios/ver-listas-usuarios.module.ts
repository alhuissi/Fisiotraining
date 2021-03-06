import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerListasUsuariosPage } from './ver-listas-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: VerListasUsuariosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerListasUsuariosPage]
})
export class VerListasUsuariosPageModule {}
