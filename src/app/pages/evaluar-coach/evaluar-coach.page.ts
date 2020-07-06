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
import { Platform } from '@ionic/angular';
import { LoadingController, AlertController } from '@ionic/angular';
import { SesionService, sesionFisio } from '../../services/sesiones.service';

@Component({
  selector: 'app-evaluar-coach',
  templateUrl: './evaluar-coach.page.html',
  styleUrls: ['./evaluar-coach.page.scss'],
})
export class EvaluarCoachPage implements OnInit {

  rateMotivacion: number;
  rateProfesionalismo: number;
  ratePuntualidad: number;
  nombreProfe: string;
  idProfe: string;
  fecha: Timestamp;
  private loading;

  evaluacionSesion: evaluacionSesion;

  constructor(
    public evaluacionSesionService: EvaluacionSesionService,
    public authService: AuthenticateService,
    public navCtrl: NavController,
    public alertController: AlertController,
    private userServ: UserService,
    private router: Router,
    private db: AngularFirestore,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
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
    }
  }

  async ionViewDidEnter(){
    this.authService.getInfo();
    
    if(this.authService.getDebeEvaluar() == 'si'){

      this.evaluacionSesion.idEvaluacion = this.authService.getIDEvaluacionPendiente();
      console.log('IDEvaluacionPendiente: '+ this.authService.getIDEvaluacionPendiente());
      let fechaString = "";
      let nombreProfeString = "";
      let docRef = this.db.collection('evaluacion-sesion').doc(this.evaluacionSesion.idEvaluacion);
      await docRef.get().toPromise().then(doc => {
        if (doc.exists) {
          fechaString = doc.data().fecha.toDate().toString();
          nombreProfeString = nombreProfeString.concat(doc.data().nombreProfe);
          this.idProfe = doc.data().idProfe;
        } else {
          // doc.data() will be undefined in this case
          console.log("No existe");
        }
      }).catch(function (error) {
        console.log("Error de la base de datos: ", error);
      });
      this.fecha = fechaString;
      this.nombreProfe = nombreProfeString;
      console.log("idProfe: "+this.idProfe);
    }
    else{
      this.presentAlert();
      this.navCtrl.navigateBack('/tabs/escritorio-cliente');
    }
    
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Evaluación realizada ',
      subHeader: 'Nuestro sistema dice que estás al día con las evaluaciones de tu coach',
      message: '',
      buttons: ['OK']
    });

    await alert.present();
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
    this.navCtrl.navigateBack('/tabs/perfil-kine');
  }

  onModelChangeMotivacion($event){
    this.evaluacionSesion.ratingMotivacion = this.rateMotivacion;
  }

  onModelChangeProfesionalismo($event){
    this.evaluacionSesion.ratingProfesionalismo = this.rateProfesionalismo;
  }

  onModelChangePuntualidad($event){
    this.evaluacionSesion.ratingPuntualidad = this.ratePuntualidad;
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

  async guardarEvaluacion(){

    //const idDoc = this.sesion.id;
    //const idDoc = this.evaluacionSesionService.getID();
    const confirmation = await this.presentAlertConfirm();

    if (confirmation){
      
          //this.db.collection('evaluacion-sesion').doc(idDoc).set(this.evaluacionSesion);
          this.db.collection('evaluacion-sesion').doc(this.evaluacionSesion.idEvaluacion).update({
            ratingMotivacion: this.evaluacionSesion.ratingMotivacion,
            ratingProfesionalismo: this.evaluacionSesion.ratingProfesionalismo,
            ratingPuntualidad: this.evaluacionSesion.ratingPuntualidad,
            hecha: true,
          });
          console.log('Evaluacion guardada con éxito en la base de datos:'+ this.evaluacionSesion); 
          this.db.collection('users').doc(this.authService.getID()).update({
            debeEvaluar: 'no',
            idEvaluacionPendiente: '',
          });

          //Suma las notas a la base de datos del coach
          let mot = this.evaluacionSesion.ratingMotivacion;
          let prof = this.evaluacionSesion.ratingProfesionalismo;
          let punt = this.evaluacionSesion.ratingPuntualidad;
          await this.userServ.setUserFromID(this.idProfe);
          await this.userServ.sumarPromedioSesiones(mot,prof,punt);

          //Reset a la evaluación
          this.evaluacionSesion.ratingMotivacion = 0;
          this.evaluacionSesion.ratingProfesionalismo = 0;
          this.evaluacionSesion.ratingPuntualidad = 0;

          this.router.navigate(['/tabs/escritorio-cliente']);
      }
       else {
          console.log('Error. No se pudo grabar la evaluación en la base de datos.');
          return; 
       }
     
}

}
