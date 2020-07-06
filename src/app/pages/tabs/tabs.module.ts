import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'first', loadChildren: '../first/first.module#FirstPageModule' },
      { path: 'escritorio-admin', loadChildren: '../escritorio-admin/escritorio-admin.module#EscritorioAdminPageModule'},
 
      { path: 'escritorio-profesor', loadChildren: '../escritorio-profe/escritorio-profe.module#EscritorioProfePageModule'},
      { path: 'escritorio-cliente', loadChildren: '../escritorio-cliente/escritorio-cliente.module#EscritorioClientePageModule'},
      { path: 'escritorio-visita', loadChildren: '../escritorio-visita/escritorio-visita.module#EscritorioVisitaPageModule'},
      { path: 'mensajeria', loadChildren: '../mensajeria/mensajeria.module#MensajeriaPageModule'},
      { path: 'buscar-usuario', loadChildren: '../buscar-usuario/buscar-usuario.module#BuscarUsuarioPageModule'},
      { path: 'perfil', loadChildren: '../perfil/perfil.module#PerfilPageModule'},
      { path: 'perfil2', loadChildren: '../perfil2/perfil2.module#Perfil2PageModule'},
      { path: 'perfil-stats', loadChildren: '../perfil-stats/perfil-stats.module#PerfilStatsPageModule'},
      { path: 'evaluar-coach', loadChildren: '../evaluar-coach/evaluar-coach.module#EvaluarCoachPageModule' },
      { path: 'hacer-evaluacion-diaria', loadChildren: '../hacer-evaluacion-diaria/hacer-evaluacion-diaria.module#HacerEvaluacionDiariaPageModule'},
      { path: 'hacer-evaluacion-bimensual', loadChildren: '../hacer-evaluacion-bimensual/hacer-evaluacion-bimensual.module#HacerEvaluacionBimensualPageModule'},
      { path: 'ver-evaluaciones', loadChildren: '../ver-evaluaciones/ver-evaluaciones.module#VerEvaluacionesPageModule' },
      { path: 'abrir-evaluacion-diaria', loadChildren: '../abrir-evaluacion-diaria/abrir-evaluacion-diaria.module#AbrirEvaluacionDiariaPageModule' },
      { path: 'abrir-evaluacion-bimensual', loadChildren: '../abrir-evaluacion-bimensual/abrir-evaluacion-bimensual.module#AbrirEvaluacionBimensualPageModule' },
      { path: 'sesion-fisiotraining', loadChildren: '../sesion-fisiotraining/sesion-fisiotraining.module#SesionFisiotrainingPageModule' },
      { path: 'entrenamiento-diario', loadChildren: '../entrenamiento-diario/entrenamiento-diario.module#EntrenamientoDiarioPageModule' },
      { path: 'ficha-clinica', loadChildren: '../ficha-clinica/ficha-clinica.module#FichaClinicaPageModule' },
      { path: 'ficha-clinica2', loadChildren: '../ficha-clinica2/ficha-clinica2.module#FichaClinica2PageModule' },
      { path: 'calendario', loadChildren: '../calendario/calendario.module#CalendarioPageModule' },
      { path: 'estadisticas-globales', loadChildren: '../estadisticas-globales/estadisticas-globales.module#EstadisticasGlobalesPageModule' },
      { path: 'solicitudes', loadChildren: '../solicitudes/solicitudes.module#SolicitudesPageModule' },
      { path: 'mis-sesiones', loadChildren: '../mis-sesiones/mis-sesiones.module#MisSesionesPageModule' },
      { path: 'solicitar-sesion', loadChildren: '../solicitar-sesion/solicitar-sesion.module#SolicitarSesionPageModule' },
      { path: 'ayuda', loadChildren: '../ayuda/ayuda.module#AyudaPageModule' },
      { path: 'administrador', loadChildren: '../administrador/administrador.module#AdministradorPageModule' },
      { path: 'ver-listas-usuarios', loadChildren: '../ver-listas-usuarios/ver-listas-usuarios.module#VerListasUsuariosPageModule' },
      { path: 'mi-ficha', loadChildren: '../mi-ficha/mi-ficha.module#MiFichaPageModule' },
      { path: 'perfil-kine', loadChildren: '../perfil-kine/perfil-kine.module#PerfilKinePageModule' },
      { path: 'hacer-evaluacion-diaria-fms', loadChildren: '../hacer-evaluacion-diaria-fms/hacer-evaluacion-diaria-fms.module#HacerEvaluacionDiariaFmsPageModule' },
      { path: 'calendario-global', loadChildren: '../calendario-global/calendario-global.module#CalendarioGlobalPageModule' },
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
  declarations: [TabsPage]
})
export class TabsPageModule {}
