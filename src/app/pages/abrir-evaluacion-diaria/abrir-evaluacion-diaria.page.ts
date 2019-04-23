import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Timestamp } from 'firebase-firestore-timestamp';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { AlertController } from '@ionic/angular';
import { EvaluacionDiariaService, evaluacionDiaria } from '../../services/evaluacion-diaria.service';

@Component({
  selector: 'app-abrir-evaluacion-diaria',
  templateUrl: './abrir-evaluacion-diaria.page.html',
  styleUrls: ['./abrir-evaluacion-diaria.page.scss'],
})
export class AbrirEvaluacionDiariaPage implements OnInit {

  userName: string;
  userLastName: string;
  userEmail: string;
  userID: string;
  userRole: string;
  fecha: Timestamp;
  evaluacion: evaluacionDiaria;
  formID: string;
  nameAutor: string;

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

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router,
    private userServ: UserService,
    private evaDiServ: EvaluacionDiariaService,
    private db: AngularFirestore,
    public alertController: AlertController
  ) { }

  ngOnInit() {

    if(this.authService.userDetails()){
      this.userID = this.userServ.getUID();
      this.userEmail = this.userServ.getEmail();
      this.userName = this.userServ.getName();
      this.userLastName = this.userServ.getLastName();
      this.userRole = this.userServ.getRole();

      this.evaluacion = this.evaDiServ.getEvaluacion();
      this.formID = this.evaDiServ.evaluacionDi.formid;
      this.nameAutor = this.evaDiServ.evaluacionDi.nombreAutor;

      this.rateAlimentacion = this.evaDiServ.evaluacionDi.alimentacion;
      this.rateAutopercepcion = this.evaDiServ.evaluacionDi.autopercepcion;
      this.rateCircuito1 = this.evaDiServ.evaluacionDi.circuito1;
      this.rateCircuito2 = this.evaDiServ.evaluacionDi.circuito2;
      this.rateCircuito3 = this.evaDiServ.evaluacionDi.circuito3;
      this.rateCore = this.evaDiServ.evaluacionDi.core;
      this.rateFuerza = this.evaDiServ.evaluacionDi.fuerza;
      this.rateBrazos = this.evaDiServ.evaluacionDi.brazos;
      this.ratePiernas = this.evaDiServ.evaluacionDi.piernas;
      this.rateHidratacion = this.evaDiServ.evaluacionDi.hidratacion;
      this.rateCardio = this.evaDiServ.evaluacionDi.cardio;
      this.rateStress = this.evaDiServ.evaluacionDi.stress;
      this.rateSueno = this.evaDiServ.evaluacionDi.sueno;
    }else{
      this.navCtrl.navigateBack('');
    }
  }

  ionViewDidEnter(){
    this.userID = this.userServ.getUID();
    this.userEmail = this.userServ.getEmail();
    this.userName = this.userServ.getName();
    this.userLastName = this.userServ.getLastName();
    this.userRole = this.userServ.getRole();

    this.evaluacion = this.evaDiServ.getEvaluacion();
      this.formID = this.evaDiServ.evaluacionDi.formid;
      this.nameAutor = this.evaDiServ.evaluacionDi.nombreAutor;

      this.rateAlimentacion = this.evaDiServ.evaluacionDi.alimentacion;
      this.rateAutopercepcion = this.evaDiServ.evaluacionDi.autopercepcion;
      this.rateCircuito1 = this.evaDiServ.evaluacionDi.circuito1;
      this.rateCircuito2 = this.evaDiServ.evaluacionDi.circuito2;
      this.rateCircuito3 = this.evaDiServ.evaluacionDi.circuito3;
      this.rateCore = this.evaDiServ.evaluacionDi.core;
      this.rateFuerza = this.evaDiServ.evaluacionDi.fuerza;
      this.rateBrazos = this.evaDiServ.evaluacionDi.brazos;
      this.ratePiernas = this.evaDiServ.evaluacionDi.piernas;
      this.rateHidratacion = this.evaDiServ.evaluacionDi.hidratacion;
      this.rateCardio = this.evaDiServ.evaluacionDi.cardio;
      this.rateStress = this.evaDiServ.evaluacionDi.stress;
      this.rateSueno = this.evaDiServ.evaluacionDi.sueno;
  }

  goBack(){
    this.navCtrl.navigateBack('/tabs/ver-evaluaciones');
  }
}
