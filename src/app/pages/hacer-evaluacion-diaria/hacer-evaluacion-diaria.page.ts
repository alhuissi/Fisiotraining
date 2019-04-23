import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Timestamp } from 'firebase-firestore-timestamp';
import { evaluacionDiaria } from '../../services/evaluacion-diaria.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-hacer-evaluacion-diaria',
  templateUrl: './hacer-evaluacion-diaria.page.html',
  styleUrls: ['./hacer-evaluacion-diaria.page.scss'],
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
  rateFuerza: number;
  rateStress: number;
  rateSueno: number;

  evaluacionPrueba: evaluacionDiaria;
  fechaToday;
  


 
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router,
    private userServ: UserService,
    private db: AngularFirestore,
    public alertController: AlertController
  ) {}
 
  ngOnInit(){
    this.fechaToday = Date.now();
    
    if(this.authService.userDetails()){
      this.evaluacionPrueba ={
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
        fuerza: 0,
        nombre: 'a',
        apellido: '',
        stress: 0,
        sueno: 0,
        userid: 'a',
        formid: 'a',
        mailAutor: 'a',
        nombreAutor: 'a',
        IDAutor: '',

      };
      this.evaluacionPrueba.fecha = firestore.FieldValue.serverTimestamp();
      this.fecha = this.evaluacionPrueba.fecha;
      this.evaluacionPrueba.nombre = this.userName;
      this.evaluacionPrueba.userid = this.userID;

      this.evaluacionPrueba.mailAutor = this.authService.currentUser.mail;
      this.evaluacionPrueba.IDAutor = this.authService.currentUser.uid;
      this.evaluacionPrueba.nombreAutor = this.authService.currentUser.name;
      this.evaluacionPrueba.nombreAutor = this.evaluacionPrueba.nombreAutor.concat(' ' + this.authService.currentUser.lastName );

      this.userID = this.userServ.getUID();
      this.userEmail = this.userServ.getEmail();
      this.userName = this.userServ.getName();
      this.userLastName = this.userServ.getLastName();
      this.userRole = this.userServ.getRole();
      this.fecha = Timestamp;
    }else{
      this.navCtrl.navigateBack('');
    }
  }

  ionViewDidEnter(){
    this.userID = this.userServ.getUID();
    this.userEmail = this.userServ.getEmail();
    this.userName = this.userServ.getName();
    this.userRole = this.userServ.getRole();

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

  goBack(){
    this.navCtrl.navigateBack('/tabs/sesion-fisiotraining');
  }

  onModelChangeAutopercepcion($event){
    this.evaluacionPrueba.autopercepcion = this.rateAutopercepcion;
  }

  onModelChangeAlimentacion($event){
    this.evaluacionPrueba.alimentacion = this.rateAlimentacion;
  }

  onModelChangeHidratacion($event){
    this.evaluacionPrueba.hidratacion = this.rateHidratacion;
  }

  onModelChangeStress($event){
    this.evaluacionPrueba.stress = this.rateStress;
  }

  onModelChangeSueno($event){
    this.evaluacionPrueba.sueno = this.rateSueno;
  }

  onModelChangePiernas($event){
    this.evaluacionPrueba.piernas = this.ratePiernas;
  }

  onModelChangeCore($event){
    this.evaluacionPrueba.core = this.rateCore;
  }

  onModelChangeCircuito1($event){
    this.evaluacionPrueba.circuito1 = this.rateCircuito1;
  }

  onModelChangeCircuito2($event){
    this.evaluacionPrueba.circuito2 = this.rateCircuito2;
  }
  onModelChangeCircuito3($event){
    this.evaluacionPrueba.circuito3 = this.rateCircuito3;
  }

  onModelChangeBrazos($event){
    this.evaluacionPrueba.brazos = this.rateBrazos;
  }

  onModelChangeCardio($event){
    this.evaluacionPrueba.cardio = this.rateCardio;
  }

  onModelChangeFuerza($event){
    this.evaluacionPrueba.fuerza = this.rateFuerza;
  }


 async presentAlertConfirm() {
  return new Promise(async (resolve) => {
  const alert = await this.alertController.create({
    header: 'Guardando evaluación...',
    message: '<strong>Verifica que los datos fueron bien ingresados.</strong>',
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

  async guardarEvaluacion(){

        const uid = this.db.createId();
        const confirmation = await this.presentAlertConfirm();
        
        if (confirmation){
          this.db.collection('evaluacion-diaria').doc(uid).set({
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
              fuerza: this.evaluacionPrueba.fuerza,
              nombre: this.userName,
              apellido: this.userLastName,
              stress: this.evaluacionPrueba.stress,
              sueno: this.evaluacionPrueba.sueno,
              userid: this.userID,
              formid: uid
            })
              console.log('Evaluacion guardada con éxito en la base de datos: '+ this.evaluacionPrueba);
              this.router.navigate(['/tabs/sesion-fisiotraining']);
          }
           else {
              console.log('Error. No se pudo grabar la evaluación en la base de datos.');
              return; 
           }
         
  }


}
