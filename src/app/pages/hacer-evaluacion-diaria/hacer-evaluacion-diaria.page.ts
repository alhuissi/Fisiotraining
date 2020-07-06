import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { AuthenticateService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Timestamp } from 'firebase-firestore-timestamp';
import { evaluacionDiaria } from '../../services/evaluacion-diaria.service';
import { EvaluacionSesionService, evaluacionSesion } from '../../services/evaluacion-sesion.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { trigger, transition, animate, style } from '@angular/animations';
import { Platform } from '@ionic/angular';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { SesionService, sesionFisio } from '../../services/sesiones.service';
import { timer, interval } from 'rxjs';


@Component({
  selector: 'app-hacer-evaluacion-diaria',
  templateUrl: './hacer-evaluacion-diaria.page.html',
  styleUrls: ['./hacer-evaluacion-diaria.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('visibilityChanged', [
      transition(':enter', [
        style({ opacity: 0.5 }),
        animate('100ms ease-in', style({ height: '100px', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('100ms ease-in', style({ height: '0px', opacity: 0 }))
      ])
    ])
  ]
})
export class HacerEvaluacionDiariaPage implements OnInit {

  userName: string;
  userLastName: string;
  userEmail: string;
  userID: string;
  userRole: string;
  fecha: Timestamp;
  mailAutor: string;
  nombreAutor: string;
  IDAutor: string;
  hecha: boolean;
  debeEvaluar: string;

  rateAlimentacion: number;
  rateAutopercepcion: number;
  rateCircuito1: number;
  rateCircuito2: number;
  rateCircuito3: number;
  rateCore: number;
  rateBrazos: number;
  ratePiernas: number;
  rateHidratacion: number;
  rateCardio: number;
  rateStress: number;
  rateSueno: number;
  ratingMotivacion: number;
  ratingProfesionalismo: number;
  ratingPuntualidad: number;

  evaluacionPrueba: evaluacionDiaria;
  evaluacionSesion: evaluacionSesion;
  sesion: sesionFisio;
  private loading;
  fechaToday;
  fechaToday2;

  collapseCard;
  collapseCard2;
  collapseCard3;
  collapseCard4;

  public timeBegan = null;
  public timeStopped: any = null;
  public stoppedDuration: any = 0;
  public started = null;
  public running = false;
  public blankTime = "00:00:00.000";
  public time = "00:00:00.000";


  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router,
    private platform: Platform,
    private userServ: UserService,
    private sesionService: SesionService,
    private evaluacionSesionService: EvaluacionSesionService,
    private db: AngularFirestore,
    public alertController: AlertController,
    private appAvailability: AppAvailability,
    private inAppBrowser: InAppBrowser,
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) { }


  ngOnInit() {
    this.fechaToday = Date.now();
    this.fechaToday2 = new Date(this.fechaToday);

    if (this.authService.userDetails()) {
      this.evaluacionPrueba = {
        alimentacion: 0,
        autopercepcion: 0,
        circuito1: 0,
        circuito2: 0,
        circuito3: 0,
        core: 0,
        brazos: 0,
        fecha: this.fecha,
        piernas: 0,
        hidratacion: 0,
        cardio: 0,
        nombre: '',
        apellido: '',
        stress: 0,
        sueno: 0,
        userid: '',
        formid: '',
        mailAutor: '',
        nombreAutor: '',
        IDAutor: '',
        idSesion: '',
      };

      this.evaluacionSesion = {
        ratingMotivacion: 0,
        ratingProfesionalismo: 0,
        ratingPuntualidad: 0,
        idProfe: '',
        idAlumno: '',
        nombreProfe: '',
        nombreAlumno: '',
        fecha: this.fecha,
        formid: '',
        hecha: false,
        idSesion: '',
        idEvaluacion: '',
      };
      this.evaluacionPrueba.fecha = firestore.FieldValue.serverTimestamp();
      this.evaluacionSesion.fecha = firestore.FieldValue.serverTimestamp();
      this.fecha = this.evaluacionPrueba.fecha;
      this.evaluacionPrueba.nombre = this.userName;
      this.evaluacionPrueba.userid = this.userID;

      this.sesion = this.sesionService.getSesion();

      this.evaluacionPrueba.mailAutor = this.authService.currentUser.mail;
      this.evaluacionPrueba.IDAutor = this.authService.currentUser.uid;
      this.evaluacionPrueba.nombreAutor = this.authService.currentUser.name;
      this.evaluacionPrueba.nombreAutor = this.evaluacionPrueba.nombreAutor.concat(' ' + this.authService.currentUser.lastName);

      this.userID = this.userServ.getUID();
      this.userEmail = this.userServ.getEmail();
      this.userName = this.userServ.getName();
      this.userLastName = this.userServ.getLastName();
      this.userRole = this.userServ.getRole();
      this.fecha = Timestamp;

      //console.log('this.evaluacionPrueba.formid: ' + this.evaluacionPrueba.formid);

      this.evaluacionSesion.idAlumno = this.userServ.getUID();
      this.evaluacionSesion.idProfe = this.authService.currentUser.uid;
      this.evaluacionSesion.nombreProfe = this.evaluacionPrueba.nombreAutor;
      this.evaluacionSesion.nombreAlumno = this.userServ.getName().concat(' ' + this.userServ.getLastName());

      //this.evaluacionSesion.idSesion = this.sesion.id;

      this.evaluacionSesion.idEvaluacion = this.evaluacionPrueba.formid;


    } else {
      this.navCtrl.navigateBack('');
    }
  }

  ionViewDidEnter() {
    this.userID = this.userServ.getUID();
    this.userEmail = this.userServ.getEmail();
    this.userName = this.userServ.getName();
    this.userRole = this.userServ.getRole();

  }

  start() {
    if (this.running) {
      this.stop();
      this.running = false;
      return;
    } 
    else {
      if (this.timeBegan === null) {
        this.reset();
        this.timeBegan = new Date();
      }
      if (this.timeStopped !== null) {
        let newStoppedDuration: any = (+new Date() - this.timeStopped)
        this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
      }
      this.started = setInterval(this.clockRunning.bind(this), 10);
      this.running = true;
      return;
    } 
  }

  stop() {
    this.running = false;
    this.timeStopped = new Date();
    clearInterval(this.started);
  }

  reset() {
    this.running = false;
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.timeBegan = null;
    this.timeStopped = null;
    this.time = this.blankTime;
  }

  zeroPrefix(num, digit) {
    let zero = '';
    for (let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }

  clockRunning() {
    let currentTime: any = new Date()
    let timeElapsed: any = new Date(currentTime - this.timeBegan - this.stoppedDuration)
    let hour = timeElapsed.getUTCHours()
    let min = timeElapsed.getUTCMinutes()
    let sec = timeElapsed.getUTCSeconds()
    let ms = timeElapsed.getUTCMilliseconds();
    this.time =
      this.zeroPrefix(hour, 2) + ":" +
      this.zeroPrefix(min, 2) + ":" +
      this.zeroPrefix(sec, 2)
       + "." + this.zeroPrefix(ms, 3);
  };

  openSpotify() {
    const browser: InAppBrowserObject = this.inAppBrowser.create('https://www.spotify.com/');
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

  goBack() {
    this.navCtrl.navigateBack('/tabs/perfil');
  }

  printCardio() {
    console.log(this.rateCardio);
  }

  onModelChangeAutopercepcion($event) {
    this.evaluacionPrueba.autopercepcion = this.rateAutopercepcion;
  }

  onModelChangeAlimentacion($event) {
    this.evaluacionPrueba.alimentacion = this.rateAlimentacion;
  }

  onModelChangeHidratacion($event) {
    this.evaluacionPrueba.hidratacion = this.rateHidratacion;
  }

  onModelChangeStress($event) {
    this.evaluacionPrueba.stress = this.rateStress;
  }

  onModelChangeSueno($event) {
    this.evaluacionPrueba.sueno = this.rateSueno;
  }

  onModelChangePiernas($event) {
    this.evaluacionPrueba.piernas = this.ratePiernas;
  }

  onModelChangeCore($event) {
    this.evaluacionPrueba.core = this.rateCore;
  }

  onModelChangeCircuito1($event) {
    this.evaluacionPrueba.circuito1 = this.rateCircuito1;
  }

  onModelChangeCircuito2($event) {
    this.evaluacionPrueba.circuito2 = this.rateCircuito2;
  }

  onModelChangeCircuito3($event) {
    this.evaluacionPrueba.circuito3 = this.rateCircuito3;
  }

  onModelChangeBrazos($event) {
    this.evaluacionPrueba.brazos = this.rateBrazos;
  }

  onModelChangeCardio($event) {
    this.evaluacionPrueba.cardio = this.rateCardio;
  }


  async presentAlertConfirm() {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Guardar Evaluación',
        message: '',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Guardado cancelado');
              return resolve(false);
            }
          }, {
            text: 'Continuar',
            handler: () => {
              console.log('Guardando evaluación...');
              return resolve(true);
            }
          }
        ]
      });

      await alert.present();
    });
  }

  async guardarEvaluacion() {

    //const idDoc = this.sesion.id;
    const idDoc = this.db.createId();
    const confirmation = await this.presentAlertConfirm();

    if (confirmation) {
      this.db.collection('evaluacion-diaria').doc(idDoc).set({
        alimentacion: this.evaluacionPrueba.alimentacion,
        autopercepcion: this.evaluacionPrueba.autopercepcion,
        mailAutor: this.evaluacionPrueba.mailAutor,
        nombreAutor: this.evaluacionPrueba.nombreAutor,
        IDAutor: this.evaluacionPrueba.IDAutor,
        circuito1: this.evaluacionPrueba.circuito1,
        circuito2: this.evaluacionPrueba.circuito2,
        circuito3: this.evaluacionPrueba.circuito3,
        core: this.evaluacionPrueba.core,
        brazos: this.evaluacionPrueba.brazos,
        fecha: this.evaluacionPrueba.fecha,
        piernas: this.evaluacionPrueba.piernas,
        hidratacion: this.evaluacionPrueba.hidratacion,
        cardio: this.evaluacionPrueba.cardio,
        nombre: this.userName,
        apellido: this.userLastName,
        stress: this.evaluacionPrueba.stress,
        sueno: this.evaluacionPrueba.sueno,
        userid: this.userID,
        formid: idDoc,
        idSesion: idDoc,
      })
      this.evaluacionSesion.idEvaluacion = idDoc;

      // Crear evaluación de sesión/coach
      this.evaluacionSesion.formid = idDoc;
      this.db.collection('evaluacion-sesion').doc(idDoc).set(this.evaluacionSesion);
      console.log('Evaluacion guardada con éxito en la base de datos: ' + this.evaluacionPrueba);
      this.presentToast();

      //Cambia estado "debeEvaluar" del paciente a 'si'
      this.userServ.debeEvaluar(idDoc);

      //Suma al puntaje total de cada item
      this.userServ.sumarPromedioEntrenamientos(this.evaluacionPrueba.hidratacion*10,this.evaluacionPrueba.alimentacion*10,this.evaluacionPrueba.sueno*10,this.evaluacionPrueba.stress*10);
      //Suma 1 entrenamiento al total del user
      this.userServ.sumarEntrenamiento();

      //suma una hora trabajada al kine
      this.authService.sumarHoraTrabajada();

      //Cambia estado "realizada" de la sesión a 'si'
      this.sesionesRealizada();
      console.log('El usuario debe evaluar al coach.' + this.evaluacionSesion);


      //Reset a la evaluación
      {  
        this.evaluacionPrueba.alimentacion = 0;
        this.evaluacionPrueba.autopercepcion = 0;
        this.evaluacionPrueba.mailAutor = '';
        this.evaluacionPrueba.nombreAutor = '';
        this.evaluacionPrueba.IDAutor = '';
        this.evaluacionPrueba.circuito1 = 0;
        this.evaluacionPrueba.circuito2 = 0;
        this.evaluacionPrueba.circuito3 = 0;
        this.evaluacionPrueba.core = 0;
        this.evaluacionPrueba.brazos = 0;
        this.evaluacionPrueba.fecha = '';
        this.evaluacionPrueba.piernas = 0;
        this.evaluacionPrueba.hidratacion = 0;
        this.evaluacionPrueba.cardio = 0;
        this.userName = '';
        this.userLastName = '';
        this.evaluacionPrueba.stress = 0;
        this.evaluacionPrueba.sueno = 0;
        this.evaluacionPrueba.userid = '';
        this.evaluacionPrueba.idSesion = '';

        this.rateAlimentacion = 0;
        this.rateAutopercepcion = 0;
        this.rateCircuito1 = 0;
        this.rateCircuito2 = 0;
        this.rateCircuito3 = 0;
        this.rateCore = 0;
        this.rateBrazos = 0;
        this.ratePiernas = 0;
        this.rateHidratacion = 0;
        this.rateCardio = 0;
        this.rateStress = 0;
        this.rateSueno = 0;
        this.ratingMotivacion = 0;
        this.ratingProfesionalismo = 0;
        this.ratingPuntualidad = 0;
      }


      this.router.navigate(['/tabs/perfil']);
    }
    else {
      console.log('Error. No se pudo grabar la evaluación en la base de datos.');

      return;
    }

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Evaluación guardada con éxito',
      duration: 2000
    });
    toast.present();
  }

  sesionesRealizada(){
    let x = new Date;
    this.db.collection('sesiones').snapshotChanges().subscribe(colSnap => {
      colSnap.forEach(snap => {
        let event: any = snap.payload.doc.data();
        if (event.startTime.toDate().getDate() === x.getDate()) {
          event.startTime = event.startTime.toDate();
          if(event.idAlumno === this.userID){
            console.log('sesion maracada como realizada');
            this.db.collection('sesiones').doc(event.id).update({
              realizada: 'si',
            });
          }
        }
      });
    });
  }

}
