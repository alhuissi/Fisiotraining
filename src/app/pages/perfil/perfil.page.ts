// Perfil de Paciente

import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticateService } from '../../services/authentication.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject, Observable, combineLatest } from 'rxjs';
import { UserService } from '../../services/user.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { trigger, transition, animate, style } from '@angular/animations';
import { ActionSheetController } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EvaluacionDiariaService, evaluacionDiaria } from '../../services/evaluacion-diaria.service';
import { Timestamp } from 'firebase-firestore-timestamp';
import { SlideInOutAnimation } from '../../animations/slideInOut';

import { Chart } from 'chart.js';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
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
export class PerfilPage implements OnInit {


  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;

  userName: string;
  userLastName: string;
  userEmail: string;
  userID: string;
  userEdad: number = 0;
  userRole: string;
  authRole: string;
  nEntrenamientos: number = 0;
  direccion: string;

  rateCore: number;
  rateSup: number;
  rateInf: number;
  rateCardio: number;
  fechaEntrenamientoAnterior;

  fechaToday;
  collapseCard;

  public authIsKine: boolean = false;
  public authIsAdmin: boolean = false;
  public authIsUsuario: boolean = false;
  public authIsVisita: boolean = false;

  private loading;

  evaDiCollection: AngularFirestoreCollection<evaluacionDiaria>;
  evas: Observable<evaluacionDiaria[]>;
  evaluacion: evaluacionDiaria = {
    alimentacion: 0,
    autopercepcion: 0,
    circuito1: 0,
    circuito2: 0,
    circuito3: 0,
    core: 0,
    brazos: 0,
    fecha: Timestamp,
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


  constructor(
    public actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    private evaDiServ: EvaluacionDiariaService,
    private authService: AuthenticateService,
    private router: Router,
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
    } else {
      this.navCtrl.navigateBack('');
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/tabs/escritorio-admin');
  }

  async ionViewWillEnter() {

    this.createBarChart();

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

    } else {
      this.navCtrl.navigateBack('');
    }

    if (this.authService.userDetails()) {
      this.userID = this.userServ.getUID();
      this.userEmail = this.userServ.getEmail();
      this.userName = this.userServ.getName();
      this.userLastName = this.userServ.getLastName();
      this.userRole = this.userServ.getRole();
      this.userEdad = this.userServ.getEdad();
      this.nEntrenamientos = this.userServ.getNEntrenamientos() + this.userServ.getNFisiotrainings();
      this.direccion = this.userServ.getDireccion();

      this.authRole = this.authService.whatRole();

      //Seleccionar evaluación más reciente
      {    
        console.log('Buscando última evaluación...');
          this.evaDiCollection = this.afs.collection('evaluacion-diaria', ref => {
            return ref.limit(1).orderBy('fecha', 'desc').where('userid', '==', this.userID)
          });  

          this.evas = this.evaDiCollection.valueChanges();
          var stuff = []; //for uid
          var Salimentacion = [];
          var Sautopercepcion = [];
          var Scircuito1 = [];
          var Scircuito2 = [];
          var Scircuito3 = [];
          var Score = [];
          var Sbrazos = [];
          var Spiernas = [];
          var Shidratacion = [];
          var Scardio = [];
          var Snombre = [];
          var Sapellido = [];
          var Sstress = [];
          var Ssueno = [];
          var Suserid = [];
          var Sformid = [];
          var SmailAutor = [];
          var SnombreAutor = [];
          var SIDAutor = [];
          var Sfecha = [];


          await this.evaDiCollection.get().toPromise().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              stuff = stuff.concat(doc.id);
              Salimentacion = Salimentacion.concat(doc.data().alimentacion);
              Sautopercepcion = Sautopercepcion.concat(doc.data().autopercepcion);
              Scircuito1 = Scircuito1.concat(doc.data().circuito1);
              Scircuito2 = Scircuito2.concat(doc.data().circuito2);
              Scircuito3 = Scircuito3.concat(doc.data().circuito3);
              Score = Score.concat(doc.data().core);
              Sbrazos = Sbrazos.concat(doc.data().brazos);
              Spiernas = Spiernas.concat(doc.data().piernas);
              Shidratacion = Shidratacion.concat(doc.data().hidratacion);
              Scardio = Scardio.concat(doc.data().cardio);
              Snombre = Snombre.concat(doc.data().nombre);
              Sapellido = Sapellido.concat(doc.data().apellido);
              Sstress = Sstress.concat(doc.data().stress);
              Ssueno = Ssueno.concat(doc.data().sueno);
              Suserid = Suserid.concat(doc.data().userid);
              Sformid = Sformid.concat(doc.data().formid);
              SmailAutor = SmailAutor.concat(doc.data().mailAutor);
              SnombreAutor = SnombreAutor.concat(doc.data().nombreAutor);
              SIDAutor = SIDAutor.concat(doc.data().IDAutor);
              Sfecha = doc.data().fecha.toDate();

            });
          })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });

          let X = stuff.toString();
          let SSalimentacion = Number(Salimentacion.toString());
          let SSautopercepcion = Number(Sautopercepcion.toString());
          let SScircuito1 = Number(Scircuito1.toString());
          let SScircuito2 = Number(Scircuito2.toString());
          let SScircuito3 = Number(Scircuito3.toString());
          let SScore = Number(Score.toString());
          let SSbrazos = Number(Sbrazos.toString());
          let SSpiernas = Number(Spiernas.toString());
          let SShidratacion = Number(Shidratacion.toString());
          let SScardio = Number(Scardio.toString());
          let SSnombre = Snombre.toString();
          let SSapellido = Sapellido.toString();
          let SSstress = Number(Sstress.toString());
          let SSsueno = Number(Ssueno.toString());
          let SSuserid = Suserid.toString();
          let SSformid = Sformid.toString();
          let SSmailAutor = SmailAutor.toString();
          let SSnombreAutor = SnombreAutor.toString();
          let SSIDAutor = SIDAutor.toString();
          let SSfecha = Sfecha.toString();

          console.log('Última evaluación encontrada');

          this.evaluacion.alimentacion = SSalimentacion;
          this.evaluacion.autopercepcion = SSautopercepcion;
          this.evaluacion.circuito1 = SScircuito1;
          this.evaluacion.circuito2 = SScircuito2;
          this.evaluacion.circuito3 = SScircuito3;
          this.evaluacion.core = SScore;
          this.evaluacion.brazos = SSbrazos;
          this.evaluacion.piernas = SSpiernas;
          this.evaluacion.hidratacion = SShidratacion;
          this.evaluacion.cardio = SScardio;
          this.evaluacion.nombre = SSnombre;
          this.evaluacion.apellido = SSapellido;
          this.evaluacion.stress = SSstress;
          this.evaluacion.sueno = SSsueno;
          this.evaluacion.userid = SSuserid;
          this.evaluacion.formid = SSformid;
          this.evaluacion.mailAutor = SSmailAutor;
          this.evaluacion.nombreAutor = SSnombreAutor;
          this.evaluacion.IDAutor = SSIDAutor;
          this.evaluacion.fecha = SSfecha;

          this.rateCore = SScore;
          this.rateInf = SSpiernas;
          this.rateSup = SSbrazos;
          this.rateCardio = SScardio;

          this.evaDiServ.setEvaluacion(this.evaluacion);
      }

    } else {
      this.navCtrl.navigateBack('');
    }


  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'radar',
      data: {
        labels: ['F. Card', 'Alim.', 'Ind. Cardvasc.', 'Sueño', 'Fuerza', 'FMS', 'Stress', 'O2', 'H2O'],
        datasets: [{
          label: '',
          data: [NaN, this.userServ.getalim()/this.userServ.getNEntrenamientos(), NaN, this.userServ.getsueno()/this.userServ.getNEntrenamientos(), NaN, NaN, this.userServ.getstress()/this.userServ.getNEntrenamientos(), NaN, this.userServ.geth20()/this.userServ.getNEntrenamientos()],
          backgroundColor: 'rgb(0, 0, 255, 0.2)',
          borderColor: 'rgb(0, 0, 255, 0.3)',
          borderWidth: 1,
          pointRadius: 0,
        },
        {
          label: '',
          data: [this.userServ.getfcard()/this.userServ.getNFisiotrainings(), NaN, this.userServ.getindcardv()/this.userServ.getNFisiotrainings(), NaN, this.userServ.getfuerza()/this.userServ.getNFisiotrainings(), this.userServ.getfms()/this.userServ.getNFisiotrainings(), NaN,this.userServ.geto2()/this.userServ.getNFisiotrainings(), NaN],
          backgroundColor: 'rgb(255, 0, 0, 0.2)',
          borderColor: 'rgb(255, 0, 0, 0.3)',
          borderWidth: 1,
          pointRadius: 0,
        }
        ]
      },
      options: {
        spanGaps: true,
        scale: {
          pointLabels: {
            fontSize: 12,
          },
          angleLines: {
            display: false
          },
          ticks: {
            display: false,
            beginAtZero: true,
            min: 0,
            max: 100,
            stepSize: 20
          }
        },
        legend: {
          display: false,

        }
      }
    });
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

  async openHacerEvaluacionDiariaPage() {

    if (this.userServ.getDebeEvaluar() == 'no') {
      this.evaDiServ.setEvaluacion(this.evaluacion);
      this.router.navigate(['/tabs/hacer-evaluacion-diaria']);
    }
    else {
      await this.presentAlertDebeEvaluar();
      this.evaDiServ.setEvaluacion(this.evaluacion);
      this.router.navigate(['/tabs/hacer-evaluacion-diaria']);
    }
  }

  async presentAlertDebeEvaluar() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      subHeader: this.userName + ' ' + this.userLastName + ' debe evaluar a su coach',
      message: '',
      buttons: ['OK']
    });

    await alert.present();
  }

  openHacerEvaluacionBimensualPage() {
    this.router.navigate(['/tabs/hacer-evaluacion-bimensual']);
  }

  openVerEvaluacionesPage() {
    this.router.navigate(['/tabs/ver-evaluaciones']);
  }

  openFichaClinicaPage() {
    if (this.authService.whatRole() === 'admin' || this.authService.whatRole() === 'profesor') {
      this.router.navigate(['/tabs/ficha-clinica']);
    }
    else {
      this.router.navigate(['/tabs/ficha-clinica2']);
    }

  }

  async agregarFoto() {
    await this.presentAlert();
  }

  cambiarRol() {
    this.presentAlertRadio();
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: 'Radio',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Administrador',
          value: 'admin',

        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Profesor',
          value: 'profesor'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Cliente',
          value: 'cliente'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Visita',
          value: 'visita',
          checked: true
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cambio de rol cancelado');
          }
        }, {
          text: 'Cambiar',
          handler: (data: string) => {
            this.userServ.changeRole(data.valueOf());
            this.userRole = data.valueOf();
            console.log('Rol cambiado con éxito');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Más información',
      buttons: [{
        text: 'Evaluación Bimensual ',
        icon: 'person',
        handler: () => {
          console.log('Nombre clicked');
          this.router.navigate(['/tabs/hacer-evaluacion-bimensual']);
        }
      }, {
        text: 'Ver Evaluaciones Pasadas',
        icon: 'paper',
        handler: () => {
          console.log('Ver Evaluaciones Pasadas clicked');
          this.router.navigate(['/tabs/ver-evaluaciones']);
        }
      }, {
        text: 'Cambiar Rol Actual: ' + this.userRole,
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.presentAlertRadio();
          console.log('Cambiar Rol clicked');
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

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Agregar Foto',
      subHeader: '',
      message: 'Disponible Próximamente',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentActionSheetBoton() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: this.authService.getName() + ' ' + this.authService.getLastName(),
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
