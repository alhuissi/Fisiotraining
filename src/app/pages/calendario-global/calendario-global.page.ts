import { Component, OnInit } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, NavController, ModalController, ToastController, LoadingController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { AuthenticateService } from '../../services/authentication.service';
import { SolicitudService, solicitudFisio } from '../../services/solicitud.service';
import { SesionService, sesionFisio } from '../../services/sesiones.service';
import { UserService } from '../../services/user.service';
import { ActionSheetController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject, Observable, combineLatest } from 'rxjs';
import { EscogerUsuario2Component } from '../escoger-usuario2/escoger-usuario2.component';
import { EscogerKineSolicitudComponent } from '../escoger-kine-solicitud/escoger-kine-solicitud.component';
import { ListaClientesSelectComponent } from '../lista-clientes-select/lista-clientes-select.component';
import { ListaCoachsSelectComponent } from '../lista-coachs-select/lista-coachs-select.component';
import { myEnterAnimation } from '../../animations/enter';
import { myLeaveAnimation } from '../../animations/leave';

@Component({
  selector: 'app-calendario-global',
  templateUrl: './calendario-global.page.html',
  styleUrls: ['./calendario-global.page.scss'],
})
export class CalendarioGlobalPage implements OnInit {


  userEmail: string;
  userID: string;
  userRole: string;
  userName: string;
  userLastName: string;
  userPhone: string;
  isMonthView: boolean = false;
  isWeekView: boolean = true;
  isDayView: boolean = false;
  eventoSeleccionado: boolean = false;

  userSelected: string;
  userSelectedLastName: string;
  kineSelected: string;
  kineSelectedLastName: string;
  userIDSelected: string;
  kineIDSelected: string;

  solicitud: solicitudFisio;
  sesion: sesionFisio;

  sesionesCollection: AngularFirestoreCollection<sesionFisio>;
  sesiones: Observable<sesionFisio[]>;

  public authIsKine: boolean = false;
  public authIsAdmin: boolean = false;
  public authIsUsuario: boolean = false;
  public authIsVisita: boolean = false;
  eventIsSolicitud: boolean = false;

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

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'week',
    currentDate: new Date(),
  };

  private loading;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private navCtrl: NavController,
    private userServ: UserService,
    private modal: ModalController,
    private authService: AuthenticateService,
    private db: AngularFirestore,
    @Inject(LOCALE_ID) private locale: string,
    private solService: SolicitudService,
    private sesService: SesionService,
    public loadingController: LoadingController,
  ) {

  }

  ngOnInit() {
    if (this.authService.userDetails()) {

      if (this.authService.whatRole() === 'admin') {
        this.authIsAdmin = true;
      }

      if (this.authService.whatRole() === 'profesor') {
        this.authIsKine = true;
      }
      if (this.authService.whatRole() === 'cliente') {
        this.authIsUsuario = true;
      }
      if (this.authService.whatRole() === 'visita') {
        this.authIsVisita = true;
      }
    }
    else {
      this.navCtrl.navigateBack('');
    }
  }

  ionViewDidEnter() {
    this.myCal.loadEvents();
  }

  ionViewWillEnter() {

    this.isWeekView = true;
    this.calendar.mode = 'week';
    if (this.authService.userDetails()) {

      this.solicitud = {
        nombre: this.userName,
        apellido: this.userLastName,
        mail: this.userEmail,
        idAlumno: this.userID,
        phone: this.userPhone,
        fechaEmision: '',
        fecha: '',
        id: '',
        kine: '',
        kineID: '',
        title: '',
        desc: '',
        startTime: new Date,
        endTime: new Date,
        allDay: false,
      };

      this.sesion = {
        nombreKine: this.userName,
        nombreAlumno: '',
        idKine: this.userID,
        idAlumno: '',
        id: '',
        fecha: '',
        fechaEmision: '',
      };

      this.userEmail = this.authService.userDetails().email;
      this.userID = this.authService.userDetails().uid;
      this.userName = this.authService.getName();
      this.userLastName = this.authService.getLastName();
      this.userRole = this.authService.getRole();
      this.userPhone = this.authService.getPhone();
      this.userSelected = "Seleccionar Paciente";
      this.kineSelected = "Seleccionar Coach";

      if (this.authService.whatRole() === 'admin') {
        this.authIsAdmin = true;
        //Carga el calendario completo si es admin
        this.db.collection('sesiones').snapshotChanges().subscribe(colSnap => {
          this.eventSource = [];
          colSnap.forEach(snap => {
            let event: any = snap.payload.doc.data();
            event.id = snap.payload.doc.id;
            event.startTime = event.startTime.toDate();
            event.endTime = event.endTime.toDate();
            if (event.realizada === 'no') {
              let x = new Date;
              event.eventColor = 'rgba(250, 20, 20, 0.737)';
            }
            if (event.realizada === 'si') {
              event.eventColor = 'rgba(0, 200, 50, 0.9)';
            }
            this.eventSource.push(event);
            this.myCal.loadEvents();
          });
        });
        this.db.collection('solicitudes').snapshotChanges().subscribe(colSnap => {
          colSnap.forEach(snap => {
            let event: any = snap.payload.doc.data();
            event.id = snap.payload.doc.id;
            event.startTime = event.startTime.toDate();
            event.endTime = event.endTime.toDate();
            event.eventColor = 'rgba(56, 128, 255, 0.737)';
            this.eventSource.push(event);
            this.myCal.loadEvents();
          });
        });
        this.myCal.loadEvents();
      }


      if (this.authService.whatRole() === 'profesor') {
        this.authIsKine = true;
      }
      if (this.authService.whatRole() === 'cliente') {
        this.authIsUsuario = true;
      }
      if (this.authService.whatRole() === 'visita') {
        this.authIsVisita = true;
      }
      this.resetEvent();
    }
    else {
      this.navCtrl.navigateBack('');
    }
  }

  resetEvent() {
    this.event = {
      title: 'Fisiotraining',
      desc: 'Sesión de Kinesiología',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
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
  }

  // Create the right event format and reload source
  /*addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }
 
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
 
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
 
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }
  */

  async presentAlertConfirm() {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
        header: '¿Enviar Solicitud?',
        message: '<strong>Fecha: ' + this.solicitud.fecha + '</strong>',
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
            text: 'Confirmar',
            handler: () => {
              console.log('Solicitud Enviada. Te responderemos a la brevedad.');
              return resolve(true);
            }
          }
        ]
      });

      await alert.present();
    });
  }

  async toastExitoAgregarSesion() {
    const toast = await this.toastCtrl.create({
      message: '¡Sesión agregada con éxito!',
      duration: 3000
    });
    toast.present();
  }

  async toastConfirmarSolicitudAceptada() {
    const toast = await this.toastCtrl.create({
      message: '¡Sesión Agendada!',
      duration: 3000
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Por favor, selecciona a un paciente primero',
      subHeader: '',
      message: '',
      buttons: ['OK']
    });

    await alert.present();
  }

  // No utilizado, ver goToDate()
  async solicitarSesion() {

    const uid = this.db.createId();
    this.solicitud.nombre = this.userName;
    this.solicitud.apellido = this.userLastName;
    this.solicitud.idAlumno = this.userID;
    this.solicitud.mail = this.userEmail;
    this.solicitud.phone = this.userPhone;
    this.solicitud.id = uid.toString();
    this.solicitud.fecha = this.event.startTime.toString();
    this.solicitud.fechaEmision = Date.now().toString();
    this.solicitud.allDay = false;
    this.solicitud.title = 'Solicitud';
    this.solicitud.desc = 'Solicitud de entrenamiento de ' + this.userName + ' ' + this.userLastName;
    this.solicitud.startTime = new Date(this.event.startTime);
    this.solicitud.endTime = new Date(this.event.endTime);

    const confirmation = await this.presentAlertConfirm();

    this.solService.setSolicitud(this.solicitud);
    console.log(this.solicitud);

    if (confirmation) {
      this.db.collection('solicitudes').doc(uid).set({
        nombre: this.solicitud.nombre,
        apellido: this.solicitud.apellido,
        mail: this.solicitud.mail,
        userID: this.solicitud.idAlumno,
        phone: this.solicitud.phone,
        fechaEmision: this.solicitud.fechaEmision,
        fecha: this.solicitud.fecha,
        id: this.solicitud.id,
        title: this.solicitud.title,
        desc: this.solicitud.desc,
        startTime: this.solicitud.startTime,
        endTime: this.solicitud.endTime,
        allDay: this.solicitud.allDay,
      })
      console.log('Solicitud enviada: ' + this.solicitud);
    }
    else {
      console.log('Error. No se pudo enviar la solicitud a la base de datos.');
      return;
    }


    /* Dibuja la solicitud en el calendario*/
    /*
 let eventCopy = {
   title: this.event.title,
   startTime:  new Date(this.event.startTime),
   endTime: new Date(this.event.endTime),
   allDay: this.event.allDay,
   desc: this.event.desc
 }
 
 if (eventCopy.allDay) {
   let start = eventCopy.startTime;
   let end = eventCopy.endTime;
 
   eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
   eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
 }
 
 this.eventSource.push(eventCopy);
 this.myCal.loadEvents();
 this.resetEvent();
 */
  }

  async openEscogerUser() {
    const modalEscoger: HTMLIonModalElement = await this.modal.create({
      component: ListaClientesSelectComponent,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps: {

      }
    })

    modalEscoger.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        console.log('Paciente seleccionado: ', this.userServ.getName());
        this.userSelected = this.userServ.getName();
        this.userSelectedLastName = this.userServ.getLastName();
        this.userIDSelected = this.userServ.getUID();
      }
    });

    await modalEscoger.present();

  }

  async openEscogerKine() {
    const modalEscoger: HTMLIonModalElement = await this.modal.create({
      component: ListaCoachsSelectComponent,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps: {

      }
    })

    modalEscoger.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        console.log('Entrenador seleccionado: ', this.userServ.getName());
        this.kineSelected = this.userServ.getName();
        this.kineSelectedLastName = this.userServ.getLastName();
        this.kineIDSelected = this.userServ.getUID();
      }
    });

    await modalEscoger.present();

  }

  async agregarSesion() {

    if (this.userSelected.length > 1) {
      if (this.kineIDSelected === this.userIDSelected) {
        console.log('Error. El coach y el paciente no pueden ser la misma persona.');
        return;
      }
      const uid = this.db.createId();
      this.sesion.nombreKine = this.kineSelected;
      this.sesion.nombreAlumno = this.userSelected;
      this.sesion.idKine = this.kineIDSelected;
      this.sesion.idAlumno = this.userIDSelected;
      this.sesion.id = uid.toString();
      this.sesion.fecha = this.event.startTime.toString();
      this.sesion.fechaEmision = Date.now().toString();

      console.log(this.kineIDSelected, this.kineSelected, this.userIDSelected, this.userSelected);

      const confirmation = await this.presentAlertConfirmSesion();

      this.sesService.setSesion(this.sesion);
      console.log(this.sesion);

      if (confirmation) {

        let eventCopy = {
          title: this.userSelected,  //this.event.title,
          startTime: new Date(this.event.startTime),
          endTime: new Date(this.event.startTime),
          allDay: this.event.allDay,
          desc: this.event.desc,
          nombreKine: this.kineSelected + ' ' + this.kineSelectedLastName,
          nombreAlumno: this.userSelected + ' ' + this.userSelectedLastName,
          idKine: this.kineIDSelected,
          idAlumno: this.userIDSelected,
          id: uid.toString(),
          fecha: this.event.startTime,
          fechaEmision: Date.now(),
        }
        eventCopy.endTime.setMinutes(eventCopy.endTime.getMinutes() + 60);

        if (eventCopy.allDay) {
          let start = eventCopy.startTime;
          let end = eventCopy.endTime;
          eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
          eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
        }

        this.db.collection('sesiones').doc(uid).set(eventCopy);
        await this.toastExitoAgregarSesion();
        console.log('Sesión Guardada');
        this.eventSource.push(eventCopy);
        this.myCal.loadEvents();
        this.resetEvent();
      }


      else {
        console.log('Error. No se pudo guardar la sesion en la base de datos.');
        return;
      }



    }
    else {
      await this.presentAlert();
      console.log('Selecciona a un paciente primero');
      return;
    }
  }

  // Change current month/week/day
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  // Change between month/week/day
  changeMode(mode) {

    this.calendar.mode = mode;

    if (mode === 'month') {
      this.isMonthView = true;
      this.isWeekView = false;
      this.isDayView = false;
    }
    if (mode === 'week') {
      this.isMonthView = false;
      this.isWeekView = true;
      this.isDayView = false;
    }
    if (mode === 'day') {
      this.isMonthView = false;
      this.isWeekView = false;
      this.isDayView = true;
    }
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
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

  // Selected date range and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'Desde: ' + start + '<br><br>Hasta: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  //Cuando evento seleccionado por Kine en calendario es una solicitud
  async presentAlertConfirmSolicitud() {

    return new Promise(async (resolve) => {
      let x = new Date(this.solService.getSolicitud().fecha);

      const alert = await this.alertCtrl.create({
        header: 'Solicitud de entrenamiento',
        subHeader: this.solService.getSolicitud().nombre + ' ' + this.solService.getSolicitud().apellido + ' solicitó entrenar con ' + this.solService.getSolicitud().kine,
        message: '<strong>Fecha: ' + x.getDate() + '/0' + Number(x.getMonth() + 1) + '/' + x.getFullYear() + ' a las ' + x.getHours() + ':' + x.getMinutes() + '</strong>',
        buttons: ['OK']
        /*
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Solicitud rechazada');
              return resolve(false);
            }
          },{
            text: 'Ver Perfil',
            handler: () => {
              console.log('Solicitud aceptada, Sesión agendada');
              this.toastConfirmarSolicitudAceptada();
              return resolve(true);
            }
          }
        ]
        */
      });

      await alert.present();
    });
  }

  //Cuando evento seleccionado por Kine en calendario es una sesión
  async presentAlertConfirmSesion() {

    return new Promise(async (resolve) => {
      let x = new Date(this.sesService.getSesion().fecha);

      const alert = await this.alertCtrl.create({
        header: 'Sesión de entrenamiento',
        subHeader: this.sesService.getSesion().nombreAlumno + ' entrena con ' + this.sesService.getSesion().nombreKine,
        message: '<strong>Fecha: ' + x.getDate() + '/0' + Number(x.getMonth() + 1) + '/' + x.getFullYear() + ' a las ' + x.getHours() + ':' + x.getMinutes() + '</strong>',
        buttons: ['OK']
        /*
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Solicitud rechazada');
              return resolve(false);
            }
          },{
            text: 'Ver Perfil',
            handler: () => {
              console.log('Solicitud aceptada, Sesión agendada');
              this.toastConfirmarSolicitudAceptada();
              return resolve(true);
            }
          }
        ]
        */
      });

      await alert.present();
    });
  }

  //Cuando Kine selecciona evento en el calendario
  async onEventSelectedKine(event) {

    this.loadingController.create({
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
    });

    if (event.title == 'Solicitud') {
      // Evento es una solicitud
      //this.eventIsSolicitud = true;
      await this.solService.setSolicitudFromID(event.id);
      this.loading.dismiss();
      await this.presentAlertConfirmSolicitud();

    }
    else {
      //Evento es una sesión

      await this.sesService.setSesionFromID(event.id);
      this.loading.dismiss();
      await this.presentAlertConfirmSesion();

      /* await new Promise<any>((resolve, reject) => {
        let docRef = this.db.collection("users").doc(event.idAlumno);
        //Selecciona paciente de la sesión
        docRef.get().toPromise().then(doc => {
          if (doc.exists) {
            let user: any = {
              name: doc.data().name,
              lastName: doc.data().lastName,
              mail: doc.data().mail,
              role: doc.data().role,
              phone: doc.data().phone,
              kine: doc.data().kine,
              kineID: doc.data().kineID,
              debeEvaluar: doc.data().debeEvaluar,
              nEntrenamientos: doc.data().nEntrenamientos,
              horasTrabajadas: doc.data().horasTrabajadas,
              uid: event.idAlumno,
            }
            this.userServ.setUser(user);

            console.log("Sesión");
            this.loading.dismiss();



            resolve();
          } else {
            // doc.data() will be undefined in this case
            this.loading.dismiss();
            console.log("No existe");
          }
        }).catch(function (error) {
          console.log("Error de la base de datos: ", error);
        }).catch(err => reject(err));

      });

      */
    }
    this.loading.dismiss();

  }

  //Obsoleto, utilizamos onEventSelectedKine()
  async onEventSelectedAdmin(event) {

    if (this.authService.whatRole() === 'admin' || this.authService.whatRole() === 'profesor') {
      await new Promise<any>((resolve, reject) => {
        let docRef = this.db.collection("users").doc(event.idAlumno);
        docRef.get().toPromise().then(doc => {
          if (doc.exists) {
            let user: any = {
              name: doc.data().name,
              lastName: doc.data().lastName,
              mail: doc.data().mail,
              role: doc.data().role,
              phone: doc.data().phone,
              kine: doc.data().kine,
              kineID: doc.data().kineID,
              debeEvaluar: doc.data().debeEvaluar,
              uid: event.idAlumno,
            }

            this.userServ.setUser(user);
            this.sesion.id = event.id;
            this.sesion.fecha = event.fecha;
            this.sesion.fechaEmision = event.fechaEmision;
            this.sesion.idAlumno = event.idAlumno;
            this.sesion.idKine = event.idKine;
            this.sesion.nombreAlumno = event.nombreAlumno;
            this.sesion.nombreKine = event.nombreKine;

            this.sesService.setSesion(this.sesion);
            this.router.navigate(['/tabs/perfil']);
            resolve();
          } else {
            // doc.data() will be undefined in this case
            console.log("No existe");
          }
        }).catch(function (error) {
          console.log("Error de la base de datos: ", error);
        }).catch(err => reject(err));

      });
    }


    /*let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
   
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: 'Fecha: ' + start,
      message:  'Profe: ' + event.nombreKine + '<br>Paciente: '+ event.nombreAlumno,
      buttons: ['OK']
    });
    alert.present(); */
  }

  async onEventSelectedCliente(event) {
    this.eventoSeleccionado = true;
    let start = formatDate(event.startTime, 'short', this.locale);
    let end = formatDate(event.endTime, 'short', this.locale);

    const alert = await this.alertCtrl.create({
      header: 'Solicitud pendiente',
      subHeader: 'Kinesiólogo: ' + event.kine,
      message: 'Fecha: ' + start,
      buttons: ['OK']
    });
    const alertEntrenamiento = await this.alertCtrl.create({
      header: 'Sesión de Fisiotraining',
      subHeader: 'Kinesiólogo: ' + event.nombreKine,
      message: 'Fecha: ' + start,
      buttons: ['OK']
    });
    if (event.title == 'Solicitud') {
      await alert.present();
    }
    else {
      await alertEntrenamiento.present();
    }

    this.eventoSeleccionado = false;
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

  openEscogerKineSolicitud() {
    this.modal.create({
      component: EscogerKineSolicitudComponent,
      componentProps: {

      }
    }).then((modal) => modal.present())

  }

  // Determina acción cuando usuario hace click en el calendario
  goToDateView() {
    if (this.calendar.mode === 'week' && this.authService.whatRole() === 'cliente' && this.eventoSeleccionado === false) {
      const uid = this.db.createId();
      this.solicitud.nombre = this.userName;
      this.solicitud.apellido = this.userLastName;
      this.solicitud.idAlumno = this.userID;
      this.solicitud.mail = this.userEmail;
      this.solicitud.phone = this.userPhone;
      this.solicitud.id = uid.toString();
      this.solicitud.fecha = this.event.startTime.toString();
      this.solicitud.fechaEmision = Date.now().toString();
      this.solicitud.allDay = false;
      this.solicitud.title = 'Solicitud';
      this.solicitud.desc = 'Solicitud de entrenamiento de ' + this.userName + ' ' + this.userLastName;
      this.solicitud.startTime = new Date(this.event.startTime);
      this.solicitud.endTime = new Date(this.event.endTime);

      this.solService.setSolicitud(this.solicitud);

      this.openEscogerKineSolicitud();
      this.router.navigate(['/tabs/first']);

    }
    if (this.calendar.mode === 'month') {
      this.isMonthView = false;
      this.isWeekView = true;
      this.isDayView = false;
      this.changeMode('week');
    }

  }

  async presentActionSheet() {
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

  getEventClass(events) {
    if (events.title == 'Solicitud') {
      return 'solicitud';
    }
    else {
      return 'sesion';
    }
  }
}
