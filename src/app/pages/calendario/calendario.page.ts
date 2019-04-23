import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, NavController, ModalController, LoadingController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { AuthenticateService } from '../../services/authentication.service';
import { SolicitudService, solicitudFisio } from '../../services/solicitud.service';
import { ActionSheetController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  userEmail: string;
  userID: string;
  userRole: string;
  userName: string;
  userLastName:string;

  solicitud: solicitudFisio;

  public authIsKine: boolean = false;
  public authIsAdmin: boolean = false;
  public authIsUsuario: boolean = false;
  public authIsVisita: boolean = false;

  event = {
    title: 'Fisiotraining',
    desc: 'Sesión de Kinesiología',
    startTime: '',
    endTime: '',
    allDay: false
  };
 
  minDate = new Date().toISOString();
 
  eventSource = [];
  viewTitle;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(private alertCtrl: AlertController, 
    public actionSheetController: ActionSheetController, 
    private router: Router,
    private navCtrl: NavController, 
    private authService: AuthenticateService, 
    private db: AngularFirestore,
    @Inject(LOCALE_ID) private locale: string,
    private solService: SolicitudService,
    ) { }
 
  ngOnInit() {
    if(this.authService.userDetails()){

      this.solicitud ={
        nombre: this.userName,
    apellido: this.userLastName,
    mail: this.userEmail,
    userID: this.userID,
    fechaEmision: '',
    fecha: '',
    id: '',
      };

      this.userEmail = this.authService.userDetails().email;
    this.userID = this.authService.userDetails().uid;
    this.userName = this.authService.getName();
    this.userLastName = this.authService.getLastName();
    this.userRole = this.authService.getRole();

      if(this.authService.whatRole() === 'admin' ){
        this.authIsAdmin = true;
    }
      if(this.authService.whatRole() === 'admin' || this.authService.whatRole() === 'profesor' ){
        
        this.authIsKine = true;

    }
    if(this.authService.whatRole() === 'cliente' ){
      this.authIsUsuario = true;
  }
  if(this.authService.whatRole() === 'visita' ){
    this.authIsVisita = true;
}

    this.resetEvent();
  }
  else{
    this.navCtrl.navigateBack('');
  }
}

ionViewDidEnter(){
  this.userEmail = this.authService.userDetails().email;
    this.userID = this.authService.userDetails().uid;
    this.userName = this.authService.getName();
    this.userLastName = this.authService.getLastName();
    this.userRole = this.authService.getRole();
}
 
  resetEvent() {
    this.event = {
      title: 'Fisiotraining',
      desc: 'Sesión de Kinesiología',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }
 
  // Create the right event format and reload source
  addEvent() {
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
  
  async presentAlertConfirm() {
    return new Promise(async (resolve) => {
    const alert = await this.alertCtrl.create({
      header: 'Enviando Solicitud...',
      message: '<strong>Te responderemos a la brevedad.</strong>',
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
            console.log('Solicitud Enviada...');
            return resolve(true);
          }
        }
      ]
    });
  
    await alert.present();
  });
  }

  async solicitarSesion() {

    const uid = this.db.createId();
    this.solicitud.nombre = this.userName;
    this.solicitud.apellido = this.userLastName;
    this.solicitud.userID = this.userID;
    this.solicitud.mail = this.userEmail;
    this.solicitud.id = uid.toString();
    this.solicitud.fecha = this.event.startTime.toString();
    this.solicitud.fechaEmision = Date.now().toString();

    const confirmation = await this.presentAlertConfirm();

    this.solService.setSolicitud(this.solicitud);
    console.log(this.solicitud);

    if (confirmation){
      this.db.collection('solicitudes').doc(uid).set({ 
          nombre: this.solicitud.nombre,
          apellido: this.solicitud.apellido,
          mail: this.solicitud.mail,
          userID: this.solicitud.userID,
          fechaEmision: this.solicitud.fechaEmision,
          fecha: this.solicitud.fecha,
          id: this.solicitud.id,
          })
          console.log('Solicitud enviada: '+ this.solicitud);
      }
       else {
          console.log('Error. No se pudo enviar la solicitud a la base de datos.');
          return; 
       }


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
  }
   
  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }
   
  // Selected date reange and hence title changed
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
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }
   
  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: this.userName + ' ' + this.userLastName,
        icon: 'person',
        handler: () => {
          console.log('Nombre clicked');
        }
      }, {
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          console.log('Compartir clicked');
        }
      }, {
        text: 'Desconectarse',
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
