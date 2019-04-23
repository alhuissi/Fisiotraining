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

import { UserService } from './services/user.service';
import { EvaluacionDiariaService } from './services/evaluacion-diaria.service';
import { FichaClinicaService } from './services/ficha-clinica.service';
import { SolicitudService } from './services/solicitud.service';

import { AngularFirestore, AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { ChatComponent } from './pages/chat/chat.component';

import { FormsModule } from '@angular/forms';
import { EscogerUsuarioComponent } from './pages/escoger-usuario/escoger-usuario.component';

import { FisiotrainingTutoComponent } from './pages/fisiotraining-tuto/fisiotraining-tuto.component';
import { VerUltimaEvaluacionComponent } from './pages/ver-ultima-evaluacion/ver-ultima-evaluacion.component';
import * as firebase from 'firebase';
import { CurrentUserService } from './services/currentUser.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
 
 
@NgModule({
  declarations: [AppComponent, EscogerUsuarioComponent, ChatComponent, VerUltimaEvaluacionComponent, FisiotrainingTutoComponent],
  entryComponents: [ChatComponent, EscogerUsuarioComponent, VerUltimaEvaluacionComponent, FisiotrainingTutoComponent],
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}