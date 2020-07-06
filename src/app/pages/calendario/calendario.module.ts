import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgCalendarModule } from 'ionic2-calendar';

import { IonicModule } from '@ionic/angular';

import { CalendarioPage } from './calendario.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCalendarModule,
  ],
  
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CL' }
],

  declarations: [CalendarioPage]
})
export class CalendarioPageModule {}
