import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from './services/authentication.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { IonicSelectableModule } from 'ionic-selectable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { UserService } from './services/user.service';
import { EvaluacionDiariaService } from './services/evaluacion-diaria.service';
import { FichaClinicaService } from './services/ficha-clinica.service';
import { SolicitudService } from './services/solicitud.service';

import { AngularFirestore, AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { ChatComponent } from './pages/chat/chat.component';

import { FormsModule } from '@angular/forms';
import { EscogerUsuarioComponent } from './pages/escoger-usuario/escoger-usuario.component';
import { EscogerUsuario2Component } from './pages/escoger-usuario2/escoger-usuario2.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { ListaClientesComponent } from './pages/lista-clientes/lista-clientes.component';
import { ListaClientesSelectComponent } from './pages/lista-clientes-select/lista-clientes-select.component';
import { ListaCoachsComponent } from './pages/lista-coachs/lista-coachs.component';
import { ListaCoachsSelectComponent } from './pages/lista-coachs-select/lista-coachs-select.component';
import { ListaAdminsComponent } from './pages/lista-admins/lista-admins.component';
import { ListaVisitaComponent } from './pages/lista-visita/lista-visita.component';


import { FisiotrainingTutoComponent } from './pages/fisiotraining-tuto/fisiotraining-tuto.component';
import { VerUltimaEvaluacionComponent } from './pages/ver-ultima-evaluacion/ver-ultima-evaluacion.component';
import * as firebase from 'firebase';
import { CurrentUserService } from './services/currentUser.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { SesionService } from './services/sesiones.service';
 
 
@NgModule({
  declarations: [AppComponent, ListaClientesComponent, ListaCoachsComponent, ListaCoachsSelectComponent, ListaClientesSelectComponent, ListaAdminsComponent, ListaVisitaComponent, ListaUsuariosComponent, EscogerUsuario2Component, EscogerUsuarioComponent, ChatComponent, VerUltimaEvaluacionComponent, FisiotrainingTutoComponent],
  entryComponents: [ChatComponent, ListaCoachsComponent, ListaClientesComponent, ListaCoachsSelectComponent, ListaClientesSelectComponent, ListaAdminsComponent, ListaVisitaComponent, ListaUsuariosComponent, EscogerUsuario2Component, EscogerUsuarioComponent, VerUltimaEvaluacionComponent, FisiotrainingTutoComponent],
  imports: [
    FormsModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFireAuthModule,
    IonicSelectableModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {}},
    UserService,
    EvaluacionDiariaService,
    CurrentUserService,
    FichaClinicaService,
    SolicitudService,
    SesionService,
    AppAvailability,
    InAppBrowser,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}