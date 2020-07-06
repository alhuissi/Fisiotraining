import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authentication.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { trigger, transition, animate, style } from '@angular/animations';
import { ActionSheetController } from '@ionic/angular';
import { EvaluacionDiariaService, evaluacionDiaria } from '../../services/evaluacion-diaria.service';

@Component({
  selector: 'app-perfil-kine',
  templateUrl: './perfil-kine.page.html',
  styleUrls: ['./perfil-kine.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PerfilKinePage implements OnInit {

  userName: string;
  userLastName: string;
  userEmail: string;
  userID: string;
  userRole: string;
  userPhone: string;
  authRole: string;
  edad: number = 0;

  rateMot: number = 0;
  ratePro: number = 0;
  ratePun: number = 0;

  public authIsKine: boolean = false;
  public authIsAdmin: boolean = false;
  public authIsUsuario: boolean = false;
  public authIsVisita: boolean = false;
  public debeEvaluar: boolean = false;

  private loading;
  fechaToday;

  constructor(
    public actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    private evaDiServ: EvaluacionDiariaService,
    private authService: AuthenticateService,
    private router: Router,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private userServ: UserService,
    private alertController: AlertController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.fechaToday = Date.now();
    if (this.authService.userDetails()) {
      if (this.authService.whatRole() === 'admin') {
        this.authIsAdmin = true;
      }
      if (this.authService.whatRole() === 'admin' || this.authService.whatRole() === 'profesor') {

        this.authIsKine = true;
      }
      if (this.authService.whatRole() === 'cliente') {
        this.authIsUsuario = true;
      }
      if (this.authService.whatRole() === 'visita') {
        this.authIsVisita = true;
      }
      if (this.authService.getDebeEvaluar() == 'si') {
        this.debeEvaluar = true;
      }
      this.userID = this.userServ.getUID();
      this.userEmail = this.userServ.getEmail();
      this.userName = this.userServ.getName();
      this.userLastName = this.userServ.getLastName();
      this.userRole = this.userServ.getRole();
      this.edad = this.userServ.getEdad();
      this.authRole = this.authService.whatRole();
    } else {
      this.navCtrl.navigateBack('');
    }

  }

  ionViewWillEnter() {
    if (this.authService.userDetails()) {

      this.userID = this.userServ.getUID();
      this.userEmail = this.userServ.getEmail();
      this.userName = this.userServ.getName();
      this.userLastName = this.userServ.getLastName();
      this.userRole = this.userServ.getRole();
      this.userPhone = this.userServ.getPhone();

      this.afs.collection('users').snapshotChanges().subscribe(colSnap => {
        colSnap.forEach(snap => {
          let event: any = snap.payload.doc.data();
          if (event.uid === this.userID) {
            this.rateMot = Math.round(event.nMotivacion/event.nVecesEvaluado);
            this.ratePro = Math.round(event.nProfesionalismo/event.nVecesEvaluado);
            this.ratePun = Math.round(event.nPuntualidad/event.nVecesEvaluado);
          }
        });
      });
    }
    else{
      this.navCtrl.navigateBack('');
    }
  }

  async agregarFoto() {
    await this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Agregar Foto',
      subHeader: '',
      message: 'Disponible Próximamente',
      buttons: ['OK']
    });

    await alert.present();
  }

  async contactarKine() {
    this.presentAlertContactar();
  }

  async presentAlertContactar() {
    const alert = await this.alertController.create({
      header: 'Contactar Kine',
      subHeader: '',
      message: 'No Disponible',
      buttons: ['OK']
    });

    await alert.present();
  }

  openEvaluarCoach(){
    this.router.navigate(['/tabs/evaluar-coach']);
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }

  async presentActionSheetBoton() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: this.userName + ' ' + this.userLastName,
        icon: 'person',
        handler: () => {
          console.log('Nombre clicked');
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
      },
      {
        text: 'Cerrar Sesión',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.logout();
          console.log('Delete clicked');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
