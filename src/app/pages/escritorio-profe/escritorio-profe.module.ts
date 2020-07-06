import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

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
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CL' }
],
  declarations: [EscritorioProfePage]
})
export class EscritorioProfePageModule {}
