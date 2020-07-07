import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AngularFirestore, AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

import { IonicModule } from '@ionic/angular';

import { BuscarUsuarioPage } from './buscar-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarUsuarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BuscarUsuarioPage]
})
export class BuscarUsuarioPageModule {}
