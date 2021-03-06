import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { EscogerUsuarioComponent } from '../escoger-usuario/escoger-usuario.component';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-escritorio-visita',
  templateUrl: './escritorio-visita.page.html',
  styleUrls: ['./escritorio-visita.page.scss'],
})
export class EscritorioVisitaPage implements OnInit {

  userLastName: string = '';
  userRole: string = '';
  userName: string = '';
  userEmail: string = '';
  userID: string = '';
  public authIsKine: boolean = false;
  public authIsAdmin: boolean = false;
  public authIsUsuario: boolean = false;
  public authIsVisita: boolean = false;
  private loading;

  eventSource = [];
  pages: any = [];


  constructor(
    private navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private modal: ModalController,
    private authService: AuthenticateService,
    private router: Router,
    private AFauth: AngularFireAuth,
    private db: AngularFirestore,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public platform: Platform,
    public userServ: UserService,
    private appAvailability: AppAvailability,
    private inAppBrowser: InAppBrowser,
  ) {

  }

  ngOnInit() {

    this.authService.getInfo();
    this.userRole = this.authService.whatRole();
    this.userEmail = this.authService.userDetails().email;
    this.userID = this.authService.userDetails().uid;
    this.userName = this.authService.getName();
    this.userLastName = this.authService.getLastName();
    if (this.authService.userDetails()) {
      if (this.authService.whatRole() === 'admin') {
        this.authIsAdmin = true;
        this.authIsKine = false;
        this.authIsUsuario = false;
        this.authIsVisita = false;
      }
      if (this.authService.whatRole() === 'admin' || this.authService.whatRole() === 'profesor') {
        this.authIsKine = true;
        this.authIsAdmin = false;
        this.authIsUsuario = false;
        this.authIsVisita = false;
      }
      if (this.authService.whatRole() === 'cliente') {
        this.authIsUsuario = true;
        this.authIsAdmin = false;
        this.authIsKine = false;
        this.authIsVisita = false;
      }
      if (this.authService.whatRole() === 'visita') {
        this.authIsVisita = true;
        this.authIsAdmin = false;
        this.authIsKine = false;
        this.authIsUsuario = false;
      }

    } else {
      this.navCtrl.navigateBack('');
    }
  }

  ionViewDidEnter() {
    this.authService.getInfo();
    this.userEmail = this.authService.userDetails().email;
    this.userID = this.authService.userDetails().uid;
    this.userName = this.authService.getName();
    this.userLastName = this.authService.getLastName();
    this.userRole = this.authService.getRole();
    if (this.authService.userDetails()) {
      if (this.authService.whatRole() === 'admin') {
        this.authIsAdmin = true;
        this.authIsKine = false;
        this.authIsUsuario = false;
        this.authIsVisita = false;
      }
      if (this.authService.whatRole() === 'admin' || this.authService.whatRole() === 'profesor') {
        this.authIsKine = true;
        this.authIsAdmin = false;
        this.authIsUsuario = false;
        this.authIsVisita = false;
      }
      if (this.authService.whatRole() === 'cliente') {
        this.authIsUsuario = true;
        this.authIsAdmin = false;
        this.authIsKine = false;
        this.authIsVisita = false;
      }
      if (this.authService.whatRole() === 'visita') {
        this.authIsVisita = true;
        this.authIsAdmin = false;
        this.authIsKine = false;
        this.authIsUsuario = false;
      }

    } else {
      this.navCtrl.navigateBack('');
    }

    if (this.authService.whatRole() === 'profesor' || this.authService.whatRole() === 'admin') {
      this.authIsKine = true;

      this.db.collection('sesiones').snapshotChanges().subscribe(colSnap => {
        this.eventSource = [];
        colSnap.forEach(snap => {
          let event: any = snap.payload.doc.data();
          if (event.idKine === this.userID) {
            event.startTime = event.startTime.toDate();
            event.endTime = event.endTime.toDate();
            this.eventSource.push(event);
          }
        });
      });
    }

    if (this.authService.whatRole() === 'cliente') {
      this.authIsUsuario = true;

      this.db.collection('sesiones').snapshotChanges().subscribe(colSnap => {
        this.eventSource = [];
        colSnap.forEach(snap => {
          let event: any = snap.payload.doc.data();
          console.log(event.idAlumno);
          if (event.idAlumno === this.userID) {
            event.startTime = event.startTime.toDate();
            event.endTime = event.endTime.toDate();
            this.eventSource.push(event);
          }
        });
      });
    }

  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.router.navigate(['login']);
      })
      .catch(error => {
        console.log(error);
      })
  }

  printID() {
    this.userEmail = this.authService.userDetails().email;
    this.userID = this.authService.userDetails().uid;

    this.userName = this.authService.getName();
    console.log('ID: ' + this.userID);
    console.log('Nombre: ' + this.userName);
    console.log('Mail: ' + this.userEmail);
  }

  openEscogerUser() {
    this.modal.create({
      component: EscogerUsuarioComponent,
      componentProps: {

      }
    }).then((modal) => modal.present())

  }

  openFisiotrainingTuto() {
    const browser: InAppBrowserObject = this.inAppBrowser.create('https://www.fisiotraining.cl/');
  }

  openVerSolicitudes() {
    this.router.navigate(['/tabs/solicitudes']);
  }

  openCalendario() {
    this.router.navigate(['/tabs/calendario']);
  }

  openAgregarSesion() {
    this.router.navigate(['/tabs/calendario']);
  }

  openMiFicha() {
    this.userServ.setUser(this.authService.currentUser);
    this.router.navigate(['/tabs/perfil']);
  }

  openInstagram(name) {
    let app;

    if (this.platform.is('ios')) {
      app = 'instagram://';
    } else if (this.platform.is('android')) {
      app = 'com.instagram.android';
    } else {
      const browser: InAppBrowserObject = this.inAppBrowser.create('https://www.instagram.com/' + name);
      return;
    }

    this.appAvailability.check(app)
      .then(
        (yes: boolean) => {
          console.log(app + ' is available')
          // Success
          // App exists
          const browser: InAppBrowserObject = this.inAppBrowser.create('instagram://user?username=' + name, '_system');
        },
        (no: boolean) => {
          // Error
          // App does not exist
          // Open Web URL
          const browser: InAppBrowserObject = this.inAppBrowser.create('https://www.instagram.com/' + name, '_system');
        }
      );
  }


  async openSolicitarSesion() {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Escoger fecha',
        message: '<strong>Escoge la hora y el día que más te acomoden.</strong>',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Solicitud cancelada');
              return resolve(false);
            }
          }, {
            text: 'Ir al Calendario',
            handler: () => {
              this.router.navigate(['/tabs/calendario']);
              return resolve(true);
            }
          }
        ]
      });
      await alert.present();
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: this.userName + ' ' + this.userLastName,
        icon: 'person',
        handler: () => {
          console.log('Nombre');
          if (this.authIsUsuario) {
            this.userServ.setUser(this.authService.currentUser);
            this.router.navigate(['/tabs/perfil']);
          }
          if (this.authIsAdmin || this.authIsKine) {
            this.userServ.setUser(this.authService.currentUser);
            this.router.navigate(['/tabs/perfil-kine']);
          }
        }
      }, /*{
      text: 'Compartir',
      icon: 'share',
      handler: () => {
        console.log('Compartir clicked');
      }
    }, */
      {
        text: 'Ayuda',
        role: 'destructive',
        icon: 'help-circle',
        handler: () => {
          console.log('Help clicked');
          this.router.navigate(['/tabs/ayuda']);
        }
      }, {
        text: 'Cerrar Sesión',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.logout();
          console.log('Desconectado');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
        }
      }]
    });
    await actionSheet.present();
  }
}
