import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Timestamp } from 'firebase-firestore-timestamp';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { trigger, transition, animate, style } from '@angular/animations';
import { AlertController } from '@ionic/angular';
import { EvaluacionBimensualService, evaluacionBimensual } from '../../services/evaluacion-bimensual.service';

@Component({
  selector: 'app-abrir-evaluacion-bimensual',
  templateUrl: './abrir-evaluacion-bimensual.page.html',
  styleUrls: ['./abrir-evaluacion-bimensual.page.scss'],
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
export class AbrirEvaluacionBimensualPage implements OnInit {

  userName: string;
  userLastName: string;
  userEmail: string;
  userID: string;
  userRole: string;
  fecha: Timestamp;
  evaluacion: evaluacionBimensual;
  formID: string;
  nameAutor: string;

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
  rateOxigenoProcentaje: number;
  ratePotencia: number;
  ratePresionArterial: number;
  rateRangosActPas: number;
  rateTGL: number;

  collapseCard;
  collapseCard2;
  collapseCard3;
  collapseCard4;
  
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router,
    private userServ: UserService,
    private evaBiServ: EvaluacionBimensualService,
    private db: AngularFirestore,
    public alertController: AlertController) { }

  ngOnInit() {
    if(this.authService.userDetails()){
      this.userID = this.userServ.getUID();
      this.userEmail = this.userServ.getEmail();
      this.userName = this.userServ.getName();
      this.userLastName = this.userServ.getLastName();
      this.userRole = this.userServ.getRole();

      this.evaluacion = this.evaBiServ.getEvaluacion();
      this.formID = this.evaBiServ.evaluacionBi.formid;
      this.nameAutor = this.evaBiServ.evaluacionBi.nombreAutor;

      this.rateColesterol = this.evaBiServ.evaluacionBi.colesterol;
      this.rateExamenKinesico = this.evaBiServ.evaluacionBi.examenKinesico;
      this.rateFcMaxima = this.evaBiServ.evaluacionBi.fcMaxima;
      this.rateFcReposo = this.evaBiServ.evaluacionBi.fcReposo;
      this.rateFms = this.evaBiServ.evaluacionBi.fms;
      this.rateFmsPorcentaje = this.evaBiServ.evaluacionBi.fmsPorcentaje;
      this.rateFuerza = this.evaBiServ.evaluacionBi.fuerza;
      this.rateFuncionCardiaca = this.evaBiServ.evaluacionBi.funcionCardiaca;
      this.rateIndiceCardiovascular = this.evaBiServ.evaluacionBi.indiceCardiovascular;
      this.rateLDL = this.evaBiServ.evaluacionBi.ldl;
      this.rateOxigeno = this.evaBiServ.evaluacionBi.oxigeno;
      this.rateOxigenoProcentaje = this.evaBiServ.evaluacionBi.oxigenoPorcentaje;
      this.ratePresionArterial = this.evaBiServ.evaluacionBi.presionArterial;
      this.rateTGL = this.evaBiServ.evaluacionBi.tgl;
      this.rateRangosActPas = this.evaBiServ.evaluacionBi.rangosActivosPasivos;

    }else{
      this.navCtrl.navigateBack('');
    }
  }
  ionViewDidEnter(){
    if(this.authService.userDetails()){
      this.userID = this.userServ.getUID();
      this.userEmail = this.userServ.getEmail();
      this.userName = this.userServ.getName();
      this.userLastName = this.userServ.getLastName();
      this.userRole = this.userServ.getRole();

      this.evaluacion = this.evaBiServ.getEvaluacion();
      this.formID = this.evaBiServ.evaluacionBi.formid;
      this.nameAutor = this.evaBiServ.evaluacionBi.nombreAutor;

      this.rateColesterol = this.evaBiServ.evaluacionBi.colesterol;
      this.rateExamenKinesico = this.evaBiServ.evaluacionBi.examenKinesico;
      this.rateFcMaxima = this.evaBiServ.evaluacionBi.fcMaxima;
      this.rateFcReposo = this.evaBiServ.evaluacionBi.fcReposo;
      this.rateFms = this.evaBiServ.evaluacionBi.fms;
      this.rateFmsPorcentaje = this.evaBiServ.evaluacionBi.fmsPorcentaje;
      this.rateFuerza = this.evaBiServ.evaluacionBi.fuerza;
      this.rateFuncionCardiaca = this.evaBiServ.evaluacionBi.funcionCardiaca;
      this.rateIndiceCardiovascular = this.evaBiServ.evaluacionBi.indiceCardiovascular;
      this.rateLDL = this.evaBiServ.evaluacionBi.ldl;
      this.rateOxigeno = this.evaBiServ.evaluacionBi.oxigeno;
      this.rateOxigenoProcentaje = this.evaBiServ.evaluacionBi.oxigenoPorcentaje;
      this.ratePresionArterial = this.evaBiServ.evaluacionBi.presionArterial;
      this.rateTGL = this.evaBiServ.evaluacionBi.tgl;
      this.rateRangosActPas = this.evaBiServ.evaluacionBi.rangosActivosPasivos;

    }else{
      this.navCtrl.navigateBack('');
    }
  }

  goBack(){
    this.navCtrl.navigateBack('/tabs/ver-evaluaciones');
  }

}
