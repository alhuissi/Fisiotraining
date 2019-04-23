import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard }  from '../../guards/auth.guard';
import { NologinGuard } from '../../guards/nologin.guard';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      { path: 'first', loadChildren: '../first/first.module#FirstPageModule' },
      { path: 'second', loadChildren: '../second/second.module#SecondPageModule' },
      { path: 'escritorio-admin', loadChildren: '../escritorio-admin/escritorio-admin.module#EscritorioAdminPageModule'},
      { path: 'mensajeria', loadChildren: '../mensajeria/mensajeria.module#MensajeriaPageModule'},
      { path: 'buscar-usuario', loadChildren: '../buscar-usuario/buscar-usuario.module#BuscarUsuarioPageModule'},
      { path: 'perfil', loadChildren: '../perfil/perfil.module#PerfilPageModule'},
      { path: 'hacer-evaluacion-diaria', loadChildren: '../hacer-evaluacion-diaria/hacer-evaluacion-diaria.module#HacerEvaluacionDiariaPageModule'},
      { path: 'hacer-evaluacion-bimensual', loadChildren: '../hacer-evaluacion-bimensual/hacer-evaluacion-bimensual.module#HacerEvaluacionBimensualPageModule'},
      { path: 'ver-evaluaciones', loadChildren: '../ver-evaluaciones/ver-evaluaciones.module#VerEvaluacionesPageModule' },
      { path: 'abrir-evaluacion-diaria', loadChildren: '../abrir-evaluacion-diaria/abrir-evaluacion-diaria.module#AbrirEvaluacionDiariaPageModule' },
      { path: 'sesion-fisiotraining', loadChildren: '../sesion-fisiotraining/sesion-fisiotraining.module#SesionFisiotrainingPageModule' },
      { path: 'entrenamiento-diario', loadChildren: '../entrenamiento-diario/entrenamiento-diario.module#EntrenamientoDiarioPageModule' },
      { path: 'ficha-clinica', loadChildren: '../ficha-clinica/ficha-clinica.module#FichaClinicaPageModule' },
      { path: 'calendario', loadChildren: '../calendario/calendario.module#CalendarioPageModule' },
      { path: 'estadisticas-globales', loadChildren: '../estadisticas-globales/estadisticas-globales.module#EstadisticasGlobalesPageModule' },
      { path: 'solicitudes', loadChildren: '../solicitudes/solicitudes.module#SolicitudesPageModule' },
      { path: 'mis-sesiones', loadChildren: '../mis-sesiones/mis-sesiones.module#MisSesionesPageModule' },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
