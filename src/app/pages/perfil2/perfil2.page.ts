// Perfil de Paciente

import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-perfil2',
  templateUrl: './perfil2.page.html',
  styleUrls: ['./perfil2.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style ({opacity:0}),
        animate('200ms ease-in', style({ opacity: 1}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({opacity: 0}))
      ])
    ])
  ]
})
export class Perfil2Page implements OnInit {

  userName: string;
  userLastName: string;
  userEmail: string;
  userID: string;
  userRole: string;
  authRole: string;

  rateCore: number;
  rateSup: number;
  rateInf: number;
  rateCardio: number;
  fechaEntrenamientoAnterior;

  fechaToday;

  public authIsKine: boolean = false;
  public authIsAdmin: boolean = false;
  public authIsUsuario: boolean = false;
  public authIsVisita: boolean = false;
  public debeEvaluar: boolean = false;

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
  ) {}
 
  async ngOnInit(){
    this.fechaToday = Date.now();
    if(this.authService.userDetails()){
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
       if(this.authService.getDebeEvaluar() == 'si'){
         this.debeEvaluar = true;
       }

    }else{
      this.navCtrl.navigateBack('');
    }

  }

  goBack(){
    this.navCtrl.navigateBack('/tabs/escritorio-admin');
  }

 async ionViewWillEnter(){

  /*this.loadingController.create({
    message: 'Cargando',
    duration: 1000,
  }).then((overlay) => {
    this.loading = overlay;
    this.loading.present();
  });
  */
 
  this.fechaToday = Date.now();
    if(this.authService.userDetails()){
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
       if(this.authService.getDebeEvaluar() == ',si'){
        this.debeEvaluar = true;
      }

    }else{
      this.navCtrl.navigateBack('');
    }
    
    if(this.authService.userDetails()){
      this.userServ.setUser(this.authService.currentUser);

      this.userID = this.userServ.getUID();
      this.userEmail = this.userServ.getEmail();
      this.userName = this.userServ.getName();
      this.userLastName = this.userServ.getLastName();
      this.userRole = this.userServ.getRole();
      
      this.authRole = this.authService.whatRole();

      console.log('Buscando última evaluación...');
     this.evaDiCollection = this.afs.collection('evaluacion-diaria', ref => {
        return ref.limit(1).orderBy('fecha', 'desc').where('userid', '==', this.userID)
      });  //Selecciona evaluación más reciente

      this.evas = this.evaDiCollection.valueChanges();
      var stuff = []; //for uid
      var Salimentacion = [];
      var Sautopercepcion= [];
      var Scircuito1= [];
      var Scircuito2= [];
      var Scircuito3= [];
      var Score= [];
      var Sbrazos= [];
      var Sfecha= [];
      var Spiernas= [];
      var Shidratacion= [];
      var Scardio= [];
      var Snombre= [];
      var Sapellido= [];
      var Sstress= [];
      var Ssueno= [];
      var Suserid= [];
      var Sformid= [];
      var SmailAutor= [];
      var SnombreAutor= [];
      var SIDAutor= [];


await this.evaDiCollection.get().toPromise().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
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
            Sfecha = doc.data().fecha.toDate();
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

        });
    })
    .catch(function(error) {
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
   
    console.log('Última evaluación encontrada');

    this.evaluacion.alimentacion = SSalimentacion;
    this.evaluacion.autopercepcion = SSautopercepcion;
    this.evaluacion.circuito1 = SScircuito1;
    this.evaluacion.circuito2 = SScircuito2;
    this.evaluacion.circuito3 = SScircuito3;
    this.evaluacion.core = SScore;
    this.evaluacion.brazos = SSbrazos;
    this.evaluacion.fecha = Sfecha;
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

    this.rateCore = SScore;
    this.rateInf = SSpiernas;
    this.rateSup = SSbrazos;
    this.rateCardio = SScardio;
    
    this.evaDiServ.setEvaluacion(this.evaluacion);


    }else{
      this.navCtrl.navigateBack('');
    }

    if(this.authService.whatRole() === 'admin'){
        this.authIsAdmin = true;
    }else{

    }
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


 async openHacerEvaluacionSesion(){
    
    console.log(this.evaluacion);
    /*const confirmation = await this.presentAlertConfirm();
    if (confirmation){
        return;
    }
     else {
        return; 
     }
     */

    //this.evaDiServ.setEvaluacion(this.evaluacion);

    //leer última evaluación
    this.router.navigate(['/tabs/evaluar-coach']);
  }

  
  openHacerEvaluacionBimensualPage(){
    //this.router.navigate(['/tabs/hacer-evaluacion-bimensual']);
  }
  openVerEvaluacionesPage(){
    this.router.navigate(['/tabs/ver-evaluaciones']);
  }

  openFichaClinicaPage(){
    this.router.navigate(['/tabs/ficha-clinica2']);
  }


  async presentAlertConfirm() {
    return new Promise(async (resolve) => {
    const alert = await this.alertController.create({
      header: 'No tienes evaluaciones pendientes',
      message: 'Debes evaluar a tu coach solo después de cada entrenamiento',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            
            return resolve(true);
          }
        }
        
      ]
    });
  
    await alert.present();
  });
  }
}