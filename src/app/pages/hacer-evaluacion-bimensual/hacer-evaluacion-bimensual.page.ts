import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Timestamp } from 'firebase-firestore-timestamp';
import { EvaluacionBimensualService, evaluacionBimensual } from '../../services/evaluacion-bimensual.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { trigger, transition, animate, style } from '@angular/animations';
import { AlertController } from '@ionic/angular';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { EvaluacionSesionService, evaluacionSesion } from '../../services/evaluacion-sesion.service';
import { Platform } from '@ionic/angular';
import { FichaClinicaService, fichaClinica } from '../../services/ficha-clinica.service';
import { SesionService, sesionFisio } from '../../services/sesiones.service';
import { timer, interval } from 'rxjs';


@Component({
  selector: 'app-hacer-evaluacion-bimensual',
  templateUrl: './hacer-evaluacion-bimensual.page.html',
  styleUrls: ['./hacer-evaluacion-bimensual.page.scss'],
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
export class HacerEvaluacionBimensualPage implements OnInit {

  public fichaClinica: fichaClinica = {
    nombre: ' ',
    edad: 0,
    ocupacion: ' ',
    ayudasTecnicas: ' ',
    actividadDeportiva: ' ',
    fecha: ' ',
    intervencionesQX: ' ',
    traumas: ' ',
    ocupacionActualTrabajo: ' ',
    antecedentes: ' ',
    habitos: ' ',
    medicamentos: ' ',
    objetivos: ' ',
    userid: ' ',
    formid: ' ',
    dir: ' '
  };

  evaluacionSesion: evaluacionSesion;

  userName: string;
  userLastName: string;
  userEmail: string;
  userID: string;
  userRole: string;
  userEdad: number;
  fecha: Timestamp;

  actividadDeportiva: string;
  antecedentes: string;
  ayudasTecnicas: string;
  diagnostico: string;
  dolor: string;
  habitos: string;
  intervencionesQx: string;
  medicamentos: string;
  motivo: string;
  objetivo: string
  objetivosEspecificos: string;
  objetivosGenerales: string;
  observacion: string;
  ocupacion: string;
  ocupacionActualTrabajo: string;
  oxigeno: number;
  palpacion: string;
  planoFrontal: string;
  planoLateral: string;
  planoPosterior: string;
  pruebasEspeciales: string;
  traumas: string;
  formid: string;

  rateColesterol: number;
  rateExamenKinesico: number;
  rateFcMaxima: number;
  rateFcReposo: number;
  rateFms: number;
  rateFmsPorcentaje: number;
  rateFuerza: number;
  rateFuncionCardiaca: number;
  rateIndiceCardiovascular: number;
  rateLDL: number;
  rateOxigeno: number;
  ratePotencia: number;
  ratePresionArterial: number;
  rateRangosActPas: number;
  rateTGL: number;

  fechaToday;
  fechaToday2;

  evaluacionPrueba: evaluacionBimensual = {
    actividadDeportiva: ' ',
    antecedentes: ' ',
    ayudasTecnicas: ' ',
    colesterol: 0,
    diagnostico: ' ',
    dolor: ' ',
    edad: 0,
    examenKinesico: 0,
    fcMaxima: 0,
    fcReposo: 0,
    fecha: this.fechaToday,
    fms: 0,
    fmsPorcentaje: 0,
    fuerza: 0,
    funcionCardiaca: 0,
    habitos: ' ',
    indiceCardiovascular: 0,
    intervencionesQx: ' ',
    ldl: 0,
    medicamentos: ' ',
    motivo: ' ',
    nombre: ' ',
    apellido: ' ',
    objetivo: ' ',
    objetivosEspecificos: ' ',
    objetivosGenerales: ' ',
    observacion: ' ',
    ocupacion: ' ',
    ocupacionActualTrabajo: ' ',
    oxigeno: 0,
    oxigenoPorcentaje: 0,
    palpacion: ' ',
    planoFrontal: ' ',
    planoLateral: ' ',
    planoPosterior: ' ',
    presionArterial: 0,
    pruebasEspeciales: ' ',
    rangosActivosPasivos: 0,
    tgl: 0,
    traumas: ' ',
    userid: ' ',
    formid: ' ',
    nombreAutor: ' ',
    mailAutor: ' ',
    IDAutor: ' ',
  };

  public evaForm: any;
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
    private evaluacionBimensualServ: EvaluacionBimensualService,
    private fichaClinicaServ: FichaClinicaService,
    private userServ: UserService,
    public toastController: ToastController,
    private db: AngularFirestore,
    public alertController: AlertController,
    private appAvailability: AppAvailability,
    private inAppBrowser: InAppBrowser,

  ) {
    /*
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.loginForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
      */
  }

  async ngOnInit() {
    this.fechaToday = Date.now();
    this.fechaToday2 = new Date(this.fechaToday);

    if (this.authService.userDetails()) {

      this.evaluacionPrueba.fecha = firestore.FieldValue.serverTimestamp();

      this.userID = this.userServ.getUID();
      this.userEmail = this.userServ.getEmail();
      this.userName = this.userServ.getName();
      this.userLastName = this.userServ.getLastName();
      this.userRole = this.userServ.getRole();
      this.fecha = Date.now();

      this.evaluacionPrueba.mailAutor = this.authService.currentUser.mail;
      this.evaluacionPrueba.IDAutor = this.authService.currentUser.uid;
      this.evaluacionPrueba.nombreAutor = this.authService.currentUser.name;
      this.evaluacionPrueba.nombreAutor = this.evaluacionPrueba.nombreAutor.concat(' ' + this.authService.currentUser.lastName);

      this.evaluacionPrueba.nombre = this.userName;
      this.evaluacionPrueba.apellido = this.userLastName;
      this.evaluacionPrueba.userid = this.userID;

      var Snombre = [];
      var Sedad = [];
      var Socupacion = [];
      var SayudasTecnicas = [];
      var SactividadDeportiva = [];
      var Sfecha = [];
      var SintervencionesQX = [];
      var Straumas = [];
      var SocupacionActualTrabajo = [];
      var Santecedentes = [];
      var Shabitos = [];
      var Smedicamentos = [];
      var Sobjetivos = [];
      var Suserid = [];
      var Sformid = [];
      let Sdir = [];

      var docRef = this.db.collection("fichas-clinicas").doc(this.userServ.getUID());

      await docRef.get().toPromise().then(function (doc) {
        if (doc.exists) {
          console.log("Ficha Clínica: ", doc.data());
          Snombre = Snombre.concat(doc.data().nombre);
          Sedad = Sedad.concat(doc.data().edad);
          Socupacion = Socupacion.concat(doc.data().ocupacion);
          SayudasTecnicas = SayudasTecnicas.concat(doc.data().ayudasTecnicas);
          SactividadDeportiva = SactividadDeportiva.concat(doc.data().actividadDeportiva);
          Sfecha = Sfecha.concat(doc.data().fecha);
          SintervencionesQX = SintervencionesQX.concat(doc.data().intervencionesQX);
          Straumas = Straumas.concat(doc.data().traumas);
          SocupacionActualTrabajo = SocupacionActualTrabajo.concat(doc.data().ocupacionActualTrabajo);
          Santecedentes = Santecedentes.concat(doc.data().antecedentes);
          Shabitos = Shabitos.concat(doc.data().habitos);
          Smedicamentos = Smedicamentos.concat(doc.data().medicamentos);
          Sobjetivos = Sobjetivos.concat(doc.data().objetivos);
          Suserid = Suserid.concat(doc.data().userid);
          Sformid = Sformid.concat(doc.data().formid);
          Sdir = Sdir.concat(doc.data().dir);
        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });

      let SSnombre = Snombre.toString();
      let SSedad = Number(Sedad.toString());
      let SSocupacion = Socupacion.toString();
      let SSayudasTecnicas = SayudasTecnicas.toString();
      let SSactividadDeporiva = SactividadDeportiva.toString();
      let SSfecha = Sfecha.toString();
      let SSintervencionesQX = SintervencionesQX.toString();
      let SStraumas = Straumas.toString();
      let SSocupacionActualTRabajo = SocupacionActualTrabajo.toString();
      let SSantecedentes = Santecedentes.toString();
      let SShabitos = Shabitos.toString();
      let SSmedicamentos = Smedicamentos.toString();
      let SSobjetivos = Sobjetivos.toString();
      let SSuserid = Suserid.toString();
      let SSformid = Sformid.toString();
      let SSdir = Sdir.toString();


      this.fichaClinica.nombre = SSnombre;
      this.fichaClinica.edad = SSedad;
      this.userEdad = SSedad;
      this.fichaClinica.ocupacion = SSocupacion;
      this.fichaClinica.ayudasTecnicas = SSayudasTecnicas;
      this.fichaClinica.actividadDeportiva = SSactividadDeporiva;

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

      this.evaluacionSesion.fecha = firestore.FieldValue.serverTimestamp();

      if (this.fichaClinica.fecha === '') {
        this.fichaClinica.fecha = Date.now();
      }
      else {
        this.fichaClinica.fecha = SSfecha;
      }
      this.fichaClinica.intervencionesQX = SSintervencionesQX;
      this.fichaClinica.traumas = SStraumas;
      this.fichaClinica.ocupacionActualTrabajo = SSocupacionActualTRabajo;
      this.fichaClinica.antecedentes = SSantecedentes;
      this.fichaClinica.habitos = SShabitos;
      this.fichaClinica.medicamentos = SSmedicamentos;
      this.fichaClinica.objetivos = SSobjetivos;
      this.fichaClinica.userid = SSuserid;
      this.fichaClinica.formid = SSformid;
      this.fichaClinica.dir = SSdir;

      this.evaluacionSesion.idAlumno = this.userServ.getUID();
      this.evaluacionSesion.idProfe = this.authService.currentUser.uid;
      this.evaluacionSesion.nombreProfe = this.evaluacionPrueba.nombreAutor;
      this.evaluacionSesion.nombreAlumno = this.userServ.getName().concat(' ' + this.userServ.getLastName());

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
    this.userLastName = this.userServ.getLastName();

    try {
      this.rateFms = this.evaluacionBimensualServ.getFms();
    }
    catch (error) {
      console.error("No existe FMS");
    }

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
      this.zeroPrefix(sec, 2);
       + "." + this.zeroPrefix(ms, 3);
  };
  
  async presentAlertConfirm() {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Guardando evaluación...',
        message: '<strong>Estas a punto de ingresar esta evaluación a la base de datos. Esta acción es irreversible. Verifica que los datos fueron bien ingresados.</strong>',
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
            text: 'Ok',
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

  openSpotify() {
    const browser: InAppBrowserObject = this.inAppBrowser.create('https://www.spotify.com/');
  }

  startTimer() {
    const numbers = timer(1000);
    numbers.subscribe(x => console.log(x));
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

  openFMS() {
    this.router.navigate(['/tabs/hacer-evaluacion-diaria-fms']);
  }

  goBack() {
    this.navCtrl.navigateBack('/tabs/perfil');
  }

  /* Ficha Clínica */
  onModelEdad($event) {
    this.evaluacionPrueba.edad = $event.target.value;
  }
  onModelChangeActividadDeportiva($event) {
    this.evaluacionPrueba.actividadDeportiva = $event.target.value;
  }
  onModelChangeAyudasTecnicas($event) {
    this.evaluacionPrueba.ayudasTecnicas = $event.target.value;
  }
  onModelChangeDiagnostico($event) {
    this.evaluacionPrueba.diagnostico = $event.target.value;
  }
  onModelChangeDolor($event) {
    this.evaluacionPrueba.dolor = $event.target.value;
  }
  onModelChangeHabitos($event) {
    this.evaluacionPrueba.habitos = $event.target.value;
  }
  onModelChangeMedicamentos($event) {
    this.evaluacionPrueba.medicamentos = $event.target.value;
  }
  onModelChangeMotivos($event) {
    this.evaluacionPrueba.motivo = $event.target.value;
  }
  onModelChangeObjetivo($event) {
    this.evaluacionPrueba.objetivo = $event.target.value;
  }
  onModelChangeObjetivosEspecificos($event) {
    this.evaluacionPrueba.objetivosEspecificos = $event.target.value;
  }
  onModelChangeObjetivosGenerales($event) {
    this.evaluacionPrueba.objetivosGenerales = $event.target.value;
  }
  onModelChangeObservaciones($event) {
    this.evaluacionPrueba.observacion = $event.target.value;
  }
  onModelChangeOcupacion($event) {
    this.evaluacionPrueba.ocupacion = $event.target.value;
  }
  onModelChangeOcupacionActualTrabajo($event) {
    this.evaluacionPrueba.ocupacionActualTrabajo = $event.target.value;
  }
  onModelChangePalpacion($event) {
    this.evaluacionPrueba.palpacion = $event.target.value;
  }
  onModelChangePlanoFrontal($event) {
    this.evaluacionPrueba.planoFrontal = $event.target.value;
  }
  onModelChangePlanoLateral($event) {
    this.evaluacionPrueba.planoLateral = $event.target.value;
  }
  onModelChangePlanoPosterior($event) {
    this.evaluacionPrueba.planoPosterior = $event.target.value;
  }
  onModelChangePruebasEspeciales($event) {
    this.evaluacionPrueba.pruebasEspeciales = $event.target.value;
  }
  onModelChangeTraumas($event) {
    this.evaluacionPrueba.traumas = $event.target.value;
  }


  /*Estrellas/Notas*/
  onModelChangeColesterol($event) {
    this.evaluacionPrueba.colesterol = this.rateColesterol;
  }
  onModelChangeExamenKinesico($event) {
    this.evaluacionPrueba.examenKinesico = this.rateExamenKinesico;
  }
  onModelChangeFcMaxima($event) {
    this.evaluacionPrueba.fcMaxima = this.rateFcMaxima;
  }
  onModelChangeFcReposo($event) {
    this.evaluacionPrueba.fcReposo = this.rateFcReposo;
  }
  onModelChangeFuerza($event) {
    this.evaluacionPrueba.fuerza = this.rateFuerza;
  }
  onModelChangeFuncionCardiaca($event) {
    this.evaluacionPrueba.funcionCardiaca = this.rateFuncionCardiaca;
  }
  onModelChangeIndiceCardiovascular($event) {
    this.evaluacionPrueba.indiceCardiovascular = this.rateIndiceCardiovascular;
  }
  onModelChangeLDL($event) {
    this.evaluacionPrueba.ldl = this.rateLDL;
  }
  onModelChangePresionArterial($event) {
    this.evaluacionPrueba.presionArterial = this.ratePresionArterial;
  }
  onModelChangeRagosActPas($event) {
    this.evaluacionPrueba.rangosActivosPasivos = this.rateRangosActPas;
  }
  onModelChangeTGL($event) {
    this.evaluacionPrueba.tgl = this.rateTGL;
  }
  onModelChangeFms($event) {
    this.evaluacionPrueba.fmsPorcentaje = this.rateFmsPorcentaje;
  }
  onModelChangeOxigeno($event) {
    this.evaluacionPrueba.oxigenoPorcentaje = this.rateOxigeno;
  }



  async guardarEvaluacion() {

    const uid = this.db.createId();
    const confirmation = await this.presentAlertConfirm();

    if (confirmation) {
      this.db.collection('evaluacion-bimensual').doc(uid).set({
        antecedentes: this.fichaClinica.antecedentes,
        ayudasTecnicas: this.fichaClinica.ayudasTecnicas,
        actividadDeportiva: this.fichaClinica.actividadDeportiva,
        colesterol: this.evaluacionPrueba.colesterol,
        diagnostico: this.evaluacionPrueba.diagnostico,
        dolor: this.evaluacionPrueba.dolor,
        edad: this.userEdad,
        examenKinesico: this.evaluacionPrueba.examenKinesico,
        fcMaxima: this.evaluacionPrueba.fcMaxima,
        fcReposo: this.evaluacionPrueba.fcReposo,
        fecha: this.evaluacionPrueba.fecha,
        fms: this.evaluacionPrueba.fms,
        fmsPorcentaje: this.evaluacionPrueba.fmsPorcentaje,
        fuerza: this.evaluacionPrueba.fuerza,
        funcionCardiaca: this.evaluacionPrueba.funcionCardiaca,
        habitos: this.fichaClinica.habitos,
        indiceCardiovascular: this.evaluacionPrueba.indiceCardiovascular,
        intervencionesQx: this.fichaClinica.intervencionesQX,
        ldl: this.evaluacionPrueba.ldl,
        medicamentos: this.fichaClinica.medicamentos,
        motivos: this.evaluacionPrueba.motivo,
        nombre: this.evaluacionPrueba.nombre,
        apellido: this.evaluacionPrueba.apellido,
        objetivo: this.fichaClinica.objetivos,
        objetivosEspecificos: this.evaluacionPrueba.objetivosEspecificos,
        objetivosGenerales: this.evaluacionPrueba.objetivosGenerales,
        observacion: this.evaluacionPrueba.observacion,
        ocupacion: this.fichaClinica.ocupacion,
        ocupacionActualTrabajo: this.fichaClinica.ocupacionActualTrabajo,
        oxigeno: this.evaluacionPrueba.oxigeno,
        oxigenoPorcentaje: this.rateOxigeno,
        palpacion: this.evaluacionPrueba.palpacion,
        planoFrontal: this.evaluacionPrueba.planoFrontal,
        planoLateral: this.evaluacionPrueba.planoLateral,
        planoPosterior: this.evaluacionPrueba.planoPosterior,
        presionArterial: this.evaluacionPrueba.presionArterial,
        pruebasEspeciales: this.evaluacionPrueba.pruebasEspeciales,
        rangosActivosPasivos: this.evaluacionPrueba.rangosActivosPasivos,
        tgl: this.evaluacionPrueba.tgl,
        traumas: this.fichaClinica.traumas,
        userid: this.evaluacionPrueba.userid,
        formid: uid,
        nombreAutor: this.evaluacionPrueba.nombreAutor,
        mailAutor: this.evaluacionPrueba.mailAutor,
        IDAutor: this.evaluacionPrueba.IDAutor,
        idSesion: uid,
      })

      // Crear evaluación de sesión/coach
      this.evaluacionSesion.idEvaluacion = uid;
      console.log('Evaluacion Fisiotraining guardada con éxito en la base de datos: ' + this.evaluacionPrueba);

      //Suma puntaje para cada item de la evaluacion Fisiotraining
      this.userServ.sumarPromedioFisiotrainings(this.evaluacionPrueba.funcionCardiaca, this.evaluacionPrueba.indiceCardiovascular, this.rateFmsPorcentaje, this.evaluacionPrueba.fuerza, this.rateOxigeno);
      //Suma 1 Fisiotraining (bimensual) al total del user
      this.userServ.sumarFisiotraining();

      //Cambia estado "realizada" de la sesión a 'si'
      this.sesionesRealizada();

      // Crear evaluación de sesión/coach
      this.db.collection('evaluacion-sesion').doc(uid).set(this.evaluacionSesion);
      this.userServ.debeEvaluar(uid);
      this.evaluacionSesion.formid = uid;
      this.presentToast();

      //suma una hora trabajada al kine
      this.authService.sumarHoraTrabajada();
      this.evaluacionBimensualServ.reset();
      this.evaluacionPrueba = this.evaluacionBimensualServ.evaluacionBi;
      this.rateFmsPorcentaje = 0;
      this.rateFuncionCardiaca = 0;
      this.rateIndiceCardiovascular = 0;
      this.rateOxigeno = 0;

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
