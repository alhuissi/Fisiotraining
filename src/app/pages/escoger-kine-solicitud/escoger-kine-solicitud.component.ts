//Selecciona Coach para solicitud

import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subject, Observable, combineLatest } from 'rxjs';
import { AuthenticateService } from '../../services/authentication.service';
import { Router, RouterEvent } from '@angular/router';
import { SolicitudService, solicitudFisio } from '../../services/solicitud.service';
import { ToastController } from '@ionic/angular';
import { UserService, user } from '../../services/user.service';

@Component({
  selector: 'app-escoger-kine-solicitud',
  templateUrl: './escoger-kine-solicitud.component.html',
  styleUrls: ['./escoger-kine-solicitud.component.scss'],
})
export class EscogerKineSolicitudComponent implements OnInit {

  UserCollection: AngularFirestoreCollection<user>;
  ListaUsers: Observable<user[]>;

  searchterm: string;
  userName: string;
  userLastName: string;
  userEmail: string;
  userID: string;
  userRole: string;
  kineSeleccionado: boolean;

  startAt = new Subject();
  endAt = new Subject();

  users;
  allusers;

  event = {
    title: 'Fisiotraining',
    desc: 'Sesión de Kinesiología',
    startTime: '',
    endTime: '',
    allDay: false,
    nombreKine: this.userName,
    nombreAlumno: '',
    idKine: this.userID,
    idAlumno: '',
    id: '',
    fecha: '',
    fechaEmision: '',
    hecha: false,
  };

  minDate = new Date().toISOString();


  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();
  selectedPath = '';

  constructor(
    private modal: ModalController,
    private navCtrl: NavController,
    private afs: AngularFirestore,
    private router: Router,
    private solService: SolicitudService,
    private authService: AuthenticateService,
    private userServ: UserService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
    if (this.authService.userDetails()) {

    } else {
      this.navCtrl.navigateBack('');
    }

    this.event.startTime = this.solService.getSolicitud().fecha;
    this.kineSeleccionado = false;

    this.UserCollection = this.afs.collection('users', ref => ref.where('role', 'in', ['profesor', 'admin']));
    this.ListaUsers = this.UserCollection.valueChanges();
  }

  ionViewDidEnter() {

  }

  getallusers() {
    return this.afs.collection('users', ref => ref.orderBy('name')).valueChanges();
  }

  seleccionarKine(user) {

    this.userServ.setUser(user);
    this.kineSeleccionado = true;
    console.log('Kine seleccionado: ' + user);

  }

  printFecha() {

    console.log('this.solService.getSolicitud().fecha: ' + this.solService.getSolicitud().fecha);
    console.log('this.event.startTime: ' + this.event.startTime);
    let y = new Date(this.event.startTime);
    let x = new Date(this.solService.getSolicitud().fecha);
    console.log('x: ' + x);
    console.log('y: ' + y);

    x.setFullYear(Number(y.getFullYear()));
    x.setMonth(Number(y.getMonth()));
    x.setDate(Number(y.getDate()));
    x.setHours(Number(y.getHours()));
    x.setMinutes(Number(y.getMinutes()));
    console.log('x: ' + x);

  }

  async enviar() {
    if (this.kineSeleccionado) {

      let y = new Date(this.event.startTime);
      let x = new Date(this.solService.getSolicitud().fecha);
      let xx = new Date(this.solService.getSolicitud().fecha);
      console.log('x: ' + x);
      console.log('y: ' + y);

      x.setFullYear(Number(y.getFullYear()));
      x.setMonth(Number(y.getMonth()));
      x.setDate(Number(y.getDate()));
      x.setHours(Number(y.getHours()));
      x.setMinutes(Number(y.getMinutes()));
      console.log('x: ' + x);
      xx.setFullYear(Number(y.getFullYear()));
      xx.setMonth(Number(y.getMonth()));
      xx.setDate(Number(y.getDate()));
      xx.setHours(Number(y.getHours() + 1));
      xx.setMinutes(Number(y.getMinutes()));
      console.log('xx: ' + xx);

      this.solService.getSolicitud().kine = this.userServ.getName() + ' ' + this.userServ.getLastName();
      this.solService.getSolicitud().kineID = this.userServ.getUID();

      this.afs.collection('solicitudes').doc(this.solService.getIDSol()).set({
        nombre: this.solService.getSolicitud().nombre,
        apellido: this.solService.getSolicitud().apellido,
        mail: this.solService.getSolicitud().mail,
        idAlumno: this.solService.getSolicitud().idAlumno,
        phone: this.solService.getSolicitud().phone,
        fechaEmision: this.solService.getSolicitud().fechaEmision,
        fecha: x.toISOString(),
        id: this.solService.getSolicitud().id,
        kine: this.solService.getSolicitud().kine,
        kineID: this.solService.getSolicitud().kineID,
        allday: this.solService.getSolicitud().allDay,
        title: this.solService.getSolicitud().title,
        desc: this.solService.getSolicitud().desc,
        startTime: x,
        endTime: xx,
      })
      console.log('Solicitud enviada: ' + this.solService.getSolicitud());

      this.presentToast();
      this.router.navigate(['/tabs/calendario']);
      this.modal.dismiss();
      
    }

    else {
      await this.presentAlert();
    }

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Debes escoger un Kinesiólogo',
      message: '',
      buttons: ['OK']
    });

    await alert.present();
  }

  closeComponent() {
    this.router.navigate(['/tabs/calendario']);
    this.modal.dismiss();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Solicitud enviada con éxito',
      duration: 2000
    });
    toast.present();
  }

  goBack() {
    this.navCtrl.navigateBack('/tabs/calendario');
  }
}

