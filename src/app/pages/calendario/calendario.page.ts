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
import { ListaClientesSelectComponent } from '../lista-clientes-select/lista-clientes-select.component';
import { ListaCoachsSelectComponent } from '../lista-coachs-select/lista-coachs-select.component';
import { myEnterAnimation } from '../../animations/enter';
import { myLeaveAnimation } from '../../animations/leave';

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
  userPhone: string;

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
  };
 
  minDate = new Date().toISOString();
 
  eventSource = [];
  viewTitle;
 
  calendar = {
    mode: 'week',
    currentDate: new Date(),
  };
 
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
    private sesService: SesionService
    ) {
      
     }
 
  ngOnInit() {
    if(this.authService.userDetails()){

    this.solicitud ={
        nombre: this.userName,
        apellido: this.userLastName,
        mail: this.userEmail,
        userID: this.userID,
        phone: this.userPhone,
        fechaEmision: '',
        fecha: '',
        id: '',
    };

    this.sesion ={
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

    if(this.authService.whatRole() === 'admin' ){
      this.authIsAdmin = true;

      //Carga el calendario completo si es admin
      this.db.collection('sesiones').snapshotChanges().subscribe(colSnap => {
          this.eventSource = [];
          colSnap.forEach(snap => {
            let event:any = snap.payload.doc.data();
            event.id = snap.payload.doc.id;
            event.startTime = event.startTime.toDate();
            event.endTime = event.endTime.toDate(); 
            this.eventSource.push(event);
          });
      });    
    }

    //Carga el calendario del profesor
    if(this.authService.whatRole() === 'profesor' ){
      this.authIsKine = true;

      this.db.collection('sesiones').snapshotChanges().subscribe(colSnap => {
        this.eventSource = [];
        colSnap.forEach(snap => {
          let event:any = snap.payload.doc.data();
          if (event.idKine === this.userID){
           event.startTime = event.startTime.toDate();
           event.endTime = event.endTime.toDate(); 
           this.eventSource.push(event);
          }
        });
    });  
    }

    //Carga el calendario de paciente
    if(this.authService.whatRole() === 'cliente' ){
      this.authIsUsuario = true;

      this.db.collection('sesiones').snapshotChanges().subscribe(colSnap => {
        this.eventSource = [];
        colSnap.forEach(snap => {
         let event:any = snap.payload.doc.data();
         console.log(event.idAlumno);
          if (event.idAlumno === this.userID){
           event.startTime = event.startTime.toDate();
           event.endTime = event.endTime.toDate(); 
           this.eventSource.push(event);
          }
        });
    }); 
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
      allDay: false,
      nombreKine: this.userName,
      nombreAlumno: '',
      idKine: this.userID,
      idAlumno: '',
      id: '',
      fecha: '',
      fechaEmision: '',
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
      header: 'Enviando Solicitud',
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

  async presentAlertConfirmSesion() {
    return new Promise(async (resolve) => {
    const alert = await this.alertCtrl.create({
      header: '¿Agendar Sesión?',
      message: 'Paciente: <strong>' + this.userSelected + this.userSelectedLastName + '</strong><br>Entrenador: <strong>' + this.kineSelected + this.kineSelectedLastName + '</strong><br> Fecha: <strong>' + this.sesion.fecha + '</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Sesión cancelada');
            return resolve(false);
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            console.log('Guardando Sesión...');
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
      message: '¡Solicitud Existosa! Esperando la confirmación del conductor...',
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

  async solicitarSesion() {

    const uid = this.db.createId();
    this.solicitud.nombre = this.userName;
    this.solicitud.apellido = this.userLastName;
    this.solicitud.userID = this.userID;
    this.solicitud.mail = this.userEmail;
    this.solicitud.phone = this.userPhone;
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
          phone: this.solicitud.phone,
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

  async openEscogerUser(){
    const modalEscoger: HTMLIonModalElement = await this.modal.create({
      component: ListaClientesSelectComponent,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps : {
       
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

  async openEscogerKine(){
    const modalEscoger: HTMLIonModalElement = await this.modal.create({
    component: ListaCoachsSelectComponent,
    enterAnimation: myEnterAnimation,
    leaveAnimation: myLeaveAnimation,
    componentProps : {
     
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
   
    if (this.userSelected.length > 1){
      if (this.kineIDSelected == this.userIDSelected){
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

      if (confirmation){

        let eventCopy = {
          title: this.kineSelected + ' entrena a ' + this.userSelected,  //this.event.title,
          startTime:  new Date(this.event.startTime),
          endTime: new Date(this.event.startTime),
          allDay: this.event.allDay,
          desc: this.event.desc,
          nombreKine: this.kineSelected,
          nombreAlumno: this.userSelected,
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

         this.db.collection('sesiones').doc(uid).set(eventCopy)
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
  else{
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
  }
   
  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.router.navigate(['login']);
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
      message: 'Desde: ' + start + '<br><br>Hasta: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }


  async onEventSelectedKine(event) {
    await new Promise<any>((resolve, reject) => {
    let docRef =  this.db.collection("users").doc(event.idAlumno);  
      docRef.get().toPromise().then( doc => {
       if (doc.exists) {
        let user: any = {
          name: doc.data().name,
          lastName: doc.data().lastName,
          mail: doc.data().mail,
          role: doc.data().role,
          uid: event.idAlumno,
        }
          this.userServ.setUser(user);
          this.router.navigate(['/tabs/perfil']);
          resolve();
       } else {
          // doc.data() will be undefined in this case
          console.log("No existe");
       }
      }).catch(function(error) {
         console.log("Error de la base de datos: ", error);
      }).catch(err => reject(err));

    });
    // Use Angular date pipe for conversion
    /*
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
   
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc + ' con ' + event.nombreAlumno,
      message: 'Desde: ' + start + '<br><br>Hasta: ' + end,
      buttons: ['OK']
    });
    alert.present();
    */
  }

  async onEventSelectedAdmin(event) {

    if(this.authService.whatRole() === 'admin' || this.authService.whatRole() === 'profesor' ){
    await new Promise<any>((resolve, reject) => {
      let docRef =  this.db.collection("users").doc(event.idAlumno);  
      docRef.get().toPromise().then( doc => {
       if (doc.exists) {
        let user: any = {
          name: doc.data().name,
          lastName: doc.data().lastName,
          mail: doc.data().mail,
          role: doc.data().role,
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
      }).catch(function(error) {
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
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
   
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc + ' con ' + event.nombreKine,
      message: 'Desde: ' + start + '<br><br>Hasta: ' + end,
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
      }, /*{
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          console.log('Compartir clicked');
        }
      }, */{
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
