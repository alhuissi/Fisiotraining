import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Timestamp } from 'firebase-firestore-timestamp';
import { evaluacionBimensual } from '../../services/evaluacion-bimensual.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-hacer-evaluacion-bimensual',
  templateUrl: './hacer-evaluacion-bimensual.page.html',
  styleUrls: ['./hacer-evaluacion-bimensual.page.scss'],
})
export class HacerEvaluacionBimensualPage implements OnInit {

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
  oxigeno: string;
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
  rateFuerza: number;
  rateFuncionCardiaca: number;
  rateIndiceCardiovascular: number;
  rateLDL: number;
  ratePotencia: number;
  ratePresionArterial: number;
  rateRangosActPas: number;
  rateTGL: number;

  evaluacionPrueba: evaluacionBimensual;

  public evaForm: any;
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router,
    private userServ: UserService,
    private db: AngularFirestore,
    public alertController: AlertController,
 
  ) {
    /*
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.loginForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
      */
  }
 
  ngOnInit(){
    
    if(this.authService.userDetails()){
      this.evaluacionPrueba ={
        actividadDeportiva: '',
        antecedentes: '',
        ayudasTecnicas: '',
        colesterol: 0,
        diagnostico: '',
        dolor: '',
        edad: 0,
        examenKinesico: 0,
        fcMaxima: 0,
        fcReposo: 0,
        fecha: this.fecha,
        fms: 0,
        fuerza: 0,
        funcionCardiaca: 0,
        habitos: '',
        indiceCardiovascular: 0,
        intervencionesQx: '',
        ldl: 0,
        medicamentos: '',
        motivo: '',
        nombre: '',
        objetivo: '',
        objetivosEspecificos: '',
        objetivosGenerales: '',
        observacion: '',
        ocupacion: '',
        ocupacionActualTrabajo: '',
        oxigeno: '',
        palpacion: '',
        planoFrontal: '',
        planoLateral: '',
        planoPosterior: '',
        potencia: 0,
        presionArterial: 0,
        pruebasEspeciales: '',
        rangosActivosPasivos: 0,
        tgl: 0,
        traumas: '',
        userid: '',
        formid: '',

      };
      this.evaluacionPrueba.fecha = firestore.FieldValue.serverTimestamp();
      this.fecha = this.evaluacionPrueba.fecha;
      this.evaluacionPrueba.nombre = this.userName;
      this.evaluacionPrueba.userid = this.userID;

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
    this.userLastName = this.userServ.getLastName();
  }

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
    this.navCtrl.navigateBack('/tabs/perfil');
  }

  /*Strings*/
  onModelChangeActividadDeportiva($event){
    this.evaluacionPrueba.actividadDeportiva = $event.target.value;
    console.log('Actividad Deportiva: '+ this.evaluacionPrueba.actividadDeportiva);
  }
  onModelChangeAyudasTecnicas($event){
    this.evaluacionPrueba.ayudasTecnicas = $event.target.value;
    console.log('Ayudas Técnicas: '+ this.evaluacionPrueba.ayudasTecnicas);
  }
  onModelChangeDiagnostico($event){
    this.evaluacionPrueba.diagnostico = $event.target.value;
    console.log('Diagnóstico: '+ this.evaluacionPrueba.diagnostico);
  }
  onModelChangeDolor($event){
    this.evaluacionPrueba.dolor = $event.target.value;
    console.log('Evaluación del Dolor: '+ this.evaluacionPrueba.dolor);
  }
  onModelChangeHabitos($event){
    this.evaluacionPrueba.habitos = $event.target.value;
    console.log('Hábitos: '+ this.evaluacionPrueba.habitos);
  }
  onModelChangeMedicamentos($event){
    this.evaluacionPrueba.medicamentos = $event.target.value;
    console.log('Medicamentos: '+ this.evaluacionPrueba.medicamentos);
  }
  onModelChangeMotivos($event){
    this.evaluacionPrueba.motivo = $event.target.value;
    console.log('Motivos: '+ this.evaluacionPrueba.motivo);
  }
  onModelChangeObjetivo($event){
    this.evaluacionPrueba.objetivo = $event.target.value;
    console.log('Objetivo: '+ this.evaluacionPrueba.objetivo);
  }
  onModelChangeObjetivosEspecificos($event){
    this.evaluacionPrueba.objetivosEspecificos = $event.target.value;
    console.log('Objetivos Específicos: '+ this.evaluacionPrueba.objetivosEspecificos);
  }
  onModelChangeObjetivosGenerales($event){
    this.evaluacionPrueba.objetivosGenerales = $event.target.value;
    console.log('Objetivos Generales: '+ this.evaluacionPrueba.objetivosGenerales);
  }
  onModelChangeObservaciones($event){
    this.evaluacionPrueba.observacion = $event.target.value;
    console.log('Observación: '+ this.evaluacionPrueba.observacion);
  }
  onModelChangeOcupacion($event){
    this.evaluacionPrueba.ocupacion = $event.target.value;
    console.log('Ocupación: '+ this.evaluacionPrueba.ocupacion);
  }
  onModelChangeOcupacionActualTrabajo($event){
    this.evaluacionPrueba.ocupacionActualTrabajo = $event.target.value;
    console.log('Ocupación Actual Trabajos: '+ this.evaluacionPrueba.ocupacionActualTrabajo);
  }
  onModelChangePalpacion($event){
    this.evaluacionPrueba.palpacion = $event.target.value;
    console.log('Palpación: '+ this.evaluacionPrueba.palpacion);
  }
  onModelChangePlanoFrontal($event){
    this.evaluacionPrueba.planoFrontal = $event.target.value;
    console.log('Plano Frontal: '+ this.evaluacionPrueba.planoFrontal);
  }
  onModelChangePlanoLateral($event){
    this.evaluacionPrueba.planoLateral = $event.target.value;
    console.log('Plano Lateral: '+ this.evaluacionPrueba.planoLateral);
  }
  onModelChangePlanoPosterior($event){
    this.evaluacionPrueba.planoPosterior = $event.target.value;
    console.log('Plano Posterior: '+ this.evaluacionPrueba.planoPosterior);
  }
  onModelChangePruebasEspeciales($event){
    this.evaluacionPrueba.pruebasEspeciales = $event.target.value;
    console.log('Pruebas Especiales: '+ this.evaluacionPrueba.pruebasEspeciales);
  }
  onModelChangeTraumas($event){
    this.evaluacionPrueba.traumas = $event.target.value;
    console.log('Traumas: '+ this.evaluacionPrueba.traumas);
  }


  /*Estrellas/Notas*/
  onModelChangeColesterol($event){
    this.evaluacionPrueba.colesterol = this.rateColesterol;
    console.log('Colesterol: '+ this.evaluacionPrueba.colesterol);
  }
  onModelChangeExamenKinesico($event){
    this.evaluacionPrueba.examenKinesico = this.rateExamenKinesico;
    console.log('Examen Kinésico: '+ this.evaluacionPrueba.examenKinesico);
  }
  onModelChangeFcMaxima($event){
    this.evaluacionPrueba.fcMaxima = this.rateFcMaxima;
    console.log('FC Máxima: '+ this.evaluacionPrueba.fcMaxima);
  }
  onModelChangeFcReposo($event){
    this.evaluacionPrueba.fcReposo = this.rateFcReposo;
    console.log('FC Reposo: '+ this.evaluacionPrueba.fcReposo);
  }
  onModelChangeFMS($event){
    this.evaluacionPrueba.fms = this.rateFms;
    console.log('FMS: '+ this.evaluacionPrueba.fms);
  }
  onModelChangeFuerza($event){
    this.evaluacionPrueba.fuerza = this.rateFuerza;
    console.log('Fuerza: '+ this.evaluacionPrueba.fuerza);
  }
  onModelChangeFuncionCardiaca($event){
    this.evaluacionPrueba.funcionCardiaca = this.rateFuncionCardiaca;
    console.log('Función Cardiaca: '+ this.evaluacionPrueba.funcionCardiaca);
  }
  onModelChangeIndiceCardiovascular($event){
    this.evaluacionPrueba.indiceCardiovascular = this.rateIndiceCardiovascular;
    console.log('Colesterol: '+ this.evaluacionPrueba.indiceCardiovascular);
  }
  onModelChangeLDL($event){
    this.evaluacionPrueba.ldl = this.rateLDL;
    console.log('LDL: '+ this.evaluacionPrueba.ldl);
  }
  onModelChangePotencia($event){
    this.evaluacionPrueba.potencia = this.ratePotencia;
    console.log('Potencia: '+ this.evaluacionPrueba.potencia);
  }
  onModelChangePresionArterial($event){
    this.evaluacionPrueba.presionArterial = this.ratePresionArterial;
    console.log('Presión Arterial: '+ this.evaluacionPrueba.presionArterial);
  }
  onModelChangeRagosActPas($event){
    this.evaluacionPrueba.rangosActivosPasivos = this.rateRangosActPas;
    console.log('Rangos Activos Pasivos: '+ this.evaluacionPrueba.rangosActivosPasivos);
  }
  onModelChangeTGL($event){
    this.evaluacionPrueba.tgl = this.rateTGL;
    console.log('TGL: '+ this.evaluacionPrueba.tgl);
  }

  async guardarEvaluacion(){

    const uid = this.db.createId();
    const confirmation = await this.presentAlertConfirm();
    
    if (confirmation){
      this.db.collection('evaluacion-bimensual').doc(uid).set({
          antecedentes: this.evaluacionPrueba.antecedentes,
          ayudasTecnicas: this.evaluacionPrueba.ayudasTecnicas,
          colesterol: this.evaluacionPrueba.colesterol,
          diagnostico: this.evaluacionPrueba.diagnostico,
          dolor: this.evaluacionPrueba.dolor,
          edad: this.evaluacionPrueba.edad,
          examenKinesico: this.evaluacionPrueba.examenKinesico,
          fcMaxima: this.evaluacionPrueba.fcMaxima,
          fcReposo: this.evaluacionPrueba.fcReposo,
          fecha: this.evaluacionPrueba.fecha,
          fms: this.evaluacionPrueba.fms,
          fuerza: this.evaluacionPrueba.fuerza,
          funcionCardiaca: this.evaluacionPrueba.funcionCardiaca,
          habitos: this.habitos,
          indiceCardiovascular: this.evaluacionPrueba.indiceCardiovascular,
          intervencionesQx: this.evaluacionPrueba.intervencionesQx,
          ldl: this.evaluacionPrueba.ldl,
          medicamentos: this.evaluacionPrueba.medicamentos,
          motivos: this.evaluacionPrueba.motivo,
          nombre: this.evaluacionPrueba.nombre,
          objetivo: this.evaluacionPrueba.objetivo,
          objetivosEspecificos: this.evaluacionPrueba.objetivosEspecificos,
          objetivosGenerales: this.evaluacionPrueba.objetivosGenerales,
          observacion: this.evaluacionPrueba.observacion,
          ocupacion: this.evaluacionPrueba.ocupacion,
          ocupacionActualTrabajo: this.evaluacionPrueba.ocupacionActualTrabajo,
          oxigeno: this.evaluacionPrueba.oxigeno,
          palpacion: this.evaluacionPrueba.palpacion,
          planoFrontal: this.evaluacionPrueba.planoFrontal,
          planoLateral: this.evaluacionPrueba.planoLateral,
          planoPosterior: this.evaluacionPrueba.planoPosterior,
          potencia:this.evaluacionPrueba.potencia,
          presionArterial: this.evaluacionPrueba.presionArterial,
          pruebasEspeciales: this.evaluacionPrueba.pruebasEspeciales,
          rangosActivosPasivos: this.evaluacionPrueba.rangosActivosPasivos,
          tgl: this.evaluacionPrueba.tgl,
          traumas: this.evaluacionPrueba.traumas,
          userid: this.evaluacionPrueba.userid,
          formid: this.evaluacionPrueba.formid

        })
          console.log('Evaluacion guardada con éxito en la base de datos: '+ this.evaluacionPrueba);
          this.router.navigate(['/tabs/perfil']);
      }
       else {
          console.log('Error. No se pudo grabar la evaluación en la base de datos.');
          return; 
       }
     
}


}
