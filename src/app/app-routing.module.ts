import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard }  from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';



const routes: Routes = [
  /*{ path: '', loadChildren: './pages/auth/login/login.module#LoginPageModule' },*/
  /*{ path: '', loadChildren: './pages/menu/menu.module#MenuPageModule'}, */
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule'},
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule'},
  { path: 'forgot', loadChildren: './pages/auth/forgot/forgot.module#ForgotPageModule', canActivate: [NologinGuard]  },
  /*{ path: 'escritorio-admin', loadChildren: './pages/escritorio-admin/escritorio-admin.module#EscritorioAdminPageModule', canActivate: [AuthGuard] },
  { path: 'mensajeria', loadChildren: './pages/mensajeria/mensajeria.module#MensajeriaPageModule', canActivate: [AuthGuard]  },*/
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },   { path: 'buscar-usuario', loadChildren: './pages/buscar-usuario/buscar-usuario.module#BuscarUsuarioPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  //{ path: 'solicitar-sesion', loadChildren: './pages/solicitar-sesion/solicitar-sesion.module#SolicitarSesionPageModule' },
  //{ path: 'calendario', loadChildren: './pages/calendario/calendario.module#CalendarioPageModule' },
  //{ path: 'estadisticas-globales', loadChildren: './pages/estadisticas-globales/estadisticas-globales.module#EstadisticasGlobalesPageModule' },
  //{ path: 'solicitudes', loadChildren: './pages/solicitudes/solicitudes.module#SolicitudesPageModule' },
  //{ path: 'en-que-consiste', loadChildren: './pages/en-que-consiste/en-que-consiste.module#EnQueConsistePageModule' },
  //{ path: 'mis-sesiones', loadChildren: './pages/mis-sesiones/mis-sesiones.module#MisSesionesPageModule' },
  //{ path: 'ficha-clinica', loadChildren: './pages/ficha-clinica/ficha-clinica.module#FichaClinicaPageModule' },
  //{ path: 'entrenamiento-diario', loadChildren: './pages/entrenamiento-diario/entrenamiento-diario.module#EntrenamientoDiarioPageModule' },
  //{ path: 'sesion-fisiotraining', loadChildren: './pages/sesion-fisiotraining/sesion-fisiotraining.module#SesionFisiotrainingPageModule' },
  //{ path: 'abrir-evaluacion-diaria', loadChildren: './pages/abrir-evaluacion-diaria/abrir-evaluacion-diaria.module#AbrirEvaluacionDiariaPageModule' },
  //{ path: 'ver-evaluaciones', loadChildren: './pages/ver-evaluaciones/ver-evaluaciones.module#VerEvaluacionesPageModule' },
  //{ path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule' },
  //{ path: 'hacer-evaluacion-diaria', loadChildren: './pages/hacer-evaluacion-diaria/hacer-evaluacion-diaria.module#HacerEvaluacionDiariaPageModule' },
  //{ path: 'hacer-evaluacion-bimensual', loadChildren: './pages/hacer-evaluacion-bimensual/hacer-evaluacion-bimensual.module#HacerEvaluacionBimensualPageModule' },

]; 

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
