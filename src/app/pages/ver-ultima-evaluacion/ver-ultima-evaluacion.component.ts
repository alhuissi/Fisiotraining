import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Observable, combineLatest } from 'rxjs';
import { Router, RouterEvent } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthenticateService } from '../../services/authentication.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { setDefaultService } from 'selenium-webdriver/chrome';

import { Timestamp } from 'firebase-firestore-timestamp';

import { firestore } from 'firebase';
import { AlertController } from '@ionic/angular';
import { EvaluacionDiariaService, evaluacionDiaria } from '../../services/evaluacion-diaria.service';

@Component({
  selector: 'app-ver-ultima-evaluacion',
  templateUrl: './ver-ultima-evaluacion.component.html',
  styleUrls: ['./ver-ultima-evaluacion.component.scss'],
})
export class VerUltimaEvaluacionComponent implements OnInit {
  userName: string;
  userLastName: string;
  userEmail: string;
  userID: string;
  userRole: string;
  fecha = '';
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
    public alertController: AlertController,
    private modal: ModalController,
  ) { }

 async ngOnInit() {

    if(this.authService.userDetails()){
      
    }else{
      this.navCtrl.navigateBack('');
    }
  }

 async ionViewDidEnter(){
    if(this.authService.userDetails()){
      this.userID = this.userServ.getUID();
      

     this.evaluacion = await this.evaDiServ.getEvaluacion();
     
      this.nameAutor = this.evaluacion.nombreAutor; 
      this.formID = this.evaluacion.formid;
      this.fecha = this.evaluacion.fecha.toString();

      this.userName = this.evaluacion.nombre;
      this.userLastName = this.evaluacion.apellido;
      this.rateAlimentacion = this.evaluacion.alimentacion;
      this.rateAutopercepcion = this.evaluacion.autopercepcion;
      this.rateCircuito1 = this.evaluacion.circuito1;
      this.rateCircuito2 = this.evaluacion.circuito2;
      this.rateCircuito3 = this.evaluacion.circuito3;
      this.rateCore = this.evaluacion.core;
      this.rateFuerza = this.evaluacion.fuerza;
      this.rateBrazos = this.evaluacion.brazos;
      this.ratePiernas = this.evaluacion.piernas;
      this.rateHidratacion = this.evaluacion.hidratacion;
      this.rateCardio = this.evaluacion.cardio;
      this.rateStress = this.evaluacion.stress;
      this.rateSueno = this.evaluacion.sueno;
    }else{
      this.navCtrl.navigateBack('');
    }
  }
  
  closeComponent(){
    this.modal.dismiss();
  }
}
