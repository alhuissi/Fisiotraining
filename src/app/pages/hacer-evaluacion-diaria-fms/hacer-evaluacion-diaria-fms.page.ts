import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { AuthenticateService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Timestamp } from 'firebase-firestore-timestamp';
import { evaluacionDiaria } from '../../services/evaluacion-diaria.service';
import { EvaluacionBimensualService, evaluacionBimensual } from '../../services/evaluacion-bimensual.service';
import { EvaluacionFmsService, evaluacionFms } from '../../services/evaluacion-fms.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Platform } from '@ionic/angular';
import { LoadingController, AlertController } from '@ionic/angular';
import { SesionService, sesionFisio } from '../../services/sesiones.service';
import { timer, interval } from 'rxjs';

@Component({
  selector: 'app-hacer-evaluacion-diaria-fms',
  templateUrl: './hacer-evaluacion-diaria-fms.page.html',
  styleUrls: ['./hacer-evaluacion-diaria-fms.page.scss'],
})
export class HacerEvaluacionDiariaFmsPage implements OnInit {

  userName: string;
  userLastName: string;
  userEmail: string;
  userID: string;
  userRole: string;
  fecha: Timestamp;
  mailAutor: string;
  nombreAutor: string;
  IDAutor: string;
  hecha: boolean;
  debeEvaluar: string;

  evaluacionFms: evaluacionFms;

  rateDeepSquat: number;
  rateHurdleStep: number;
  rateHurdleStepLeft: number;
  rateHurdleStepRight: number;
  rateInlineLunge: number;
  rateInlineLungeLeft: number;
  rateInlineLungeRight: number;
  rateShoulderMobility: number;
  rateShoulderMobilityLeft: number;
  rateShoulderMobilityRight: number;
  rateActiveStraightLegRaise: number;
  rateActiveStraightLegRaiseLeft: number;
  rateActiveStraightLegRaiseRight: number;
  rateTrunkStabilityPushup: number;
  rateRotaryStability: number;
  rateRotaryStabilityLeft: number;
  rateRotaryStabilityRight: number;
  rateTotal: number;

  fechaToday;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router,
    private platform: Platform,
    private userServ: UserService,
    private sesionService: SesionService,
    private evaluacionFmsService: EvaluacionFmsService,
    private evaluacionBimensualService: EvaluacionBimensualService,
    private db: AngularFirestore,
    public alertController: AlertController,
    private appAvailability: AppAvailability,
    private inAppBrowser: InAppBrowser,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.fechaToday = Date.now();
    
    if(this.authService.userDetails()){
      this.evaluacionFms = {
        rateDeepSquat: 0,
        rateHurdleStep: 0,
        rateHurdleStepLeft: 0,
        rateHurdleStepRight: 0,
        rateInlineLunge: 0,
        rateInlineLungeLeft: 0,
        rateInlineLungeRight: 0,
        rateShoulderMobility: 0,
        rateShoulderMobilityLeft: 0,
        rateShoulderMobilityRight: 0,
        rateActiveStraightLegRaise: 0,
        rateActiveStraightLegRaiseLeft: 0,
        rateActiveStraightLegRaiseRight: 0,
        rateTrunkStabilityPushup: 0,
        rateRotaryStability: 0,
        rateRotaryStabilityLeft: 0,
        rateRotaryStabilityRight: 0,
      };
      this.rateTotal= 0;
    }
    else{
      this.navCtrl.navigateBack('');
    }
  }

  goBack(){
    this.navCtrl.navigateBack('/tabs/hacer-evaluacion-bimensual');
  }

  guardarEvaluacion(){
    this.evaluacionBimensualService.setFms(this.rateTotal);
      this.rateDeepSquat= 0;
      this.rateHurdleStep= 0;
      this.rateHurdleStepLeft= 0;
      this.rateHurdleStepRight= 0;
      this.rateInlineLunge= 0;
      this.rateInlineLungeLeft= 0;
      this.rateInlineLungeRight= 0;
      this.rateShoulderMobility= 0;
      this.rateShoulderMobilityLeft= 0;
      this.rateShoulderMobilityRight= 0;
      this.rateActiveStraightLegRaise= 0;
      this.rateActiveStraightLegRaiseLeft= 0;
      this.rateActiveStraightLegRaiseRight= 0;
      this.rateTrunkStabilityPushup= 0;
      this.rateRotaryStability= 0;
      this.rateRotaryStabilityLeft= 0;
      this.rateRotaryStabilityRight= 0;
      this.rateTotal= 0;
    this.navCtrl.navigateBack('/tabs/hacer-evaluacion-bimensual');
  }

  calcularFmsTotal(){
    if (this.rateHurdleStepLeft > this.rateHurdleStepRight){
      this.rateHurdleStep = this.rateHurdleStepRight;
    }
    else{
      this.rateHurdleStep = this.rateHurdleStepLeft;
    }

    if (this.rateInlineLungeLeft > this.rateInlineLungeRight){
      this.rateInlineLunge = this.rateInlineLungeRight;
    }
    else{
      this.rateInlineLunge = this.rateInlineLungeLeft;
    }

    if (this.rateShoulderMobilityLeft > this.rateShoulderMobilityRight){
      this.rateShoulderMobility = this.rateShoulderMobilityRight;
    }
    else{
      this.rateShoulderMobility = this.rateShoulderMobilityLeft;
    }

    if (this.rateActiveStraightLegRaiseLeft > this.rateActiveStraightLegRaiseRight){
      this.rateActiveStraightLegRaise = this.rateActiveStraightLegRaiseRight;
    }
    else{
      this.rateActiveStraightLegRaise = this.rateActiveStraightLegRaiseLeft;
    }

    if (this.rateRotaryStabilityLeft > this.rateRotaryStabilityRight){
      this.rateRotaryStability = this.rateRotaryStabilityRight;
    }
    else{
      this.rateRotaryStability = this.rateRotaryStabilityLeft;
    }


    this.rateTotal = this.rateHurdleStep + this.rateInlineLunge + this.rateShoulderMobility + this.rateActiveStraightLegRaise + this.rateRotaryStability + this.rateDeepSquat + this.rateTrunkStabilityPushup; 
  }

  onModelChangeDeepSquat($event){
    this.evaluacionFms.rateDeepSquat = this.rateDeepSquat;
  }
  /*
  onModelChangeHurdleStep($event){
    this.evaluacionFms.rateHurdleStep = this.rateHurdleStep;
  }
  */
  onModelChangeHurdleStepLeft($event){
    this.evaluacionFms.rateHurdleStepLeft = this.rateHurdleStepLeft;
  }
  onModelChangeHurdleStepRight($event){
    this.evaluacionFms.rateHurdleStepRight = this.rateHurdleStepRight;
  }
  /*
  onModelChangeInlineLunge($event){
    this.evaluacionFms.rateInlineLunge = this.rateInlineLunge;
  }
  */
  onModelChangeInlineLungeLeft($event){
    this.evaluacionFms.rateInlineLungeLeft = this.rateInlineLungeLeft;
  }
  onModelChangeInlineLungeRight($event){
    this.evaluacionFms.rateInlineLungeRight = this.rateInlineLungeRight;
  }
  /*
  onModelChangeShoulderMobility($event){
    this.evaluacionFms.rateShoulderMobility = this.rateShoulderMobility;
  }
  */
  onModelChangeShoulderMobilityLeft($event){
    this.evaluacionFms.rateShoulderMobilityLeft = this.rateShoulderMobilityLeft;
  }
  onModelChangeShoulderMobilityRight($event){
    this.evaluacionFms.rateShoulderMobilityRight = this.rateShoulderMobilityRight;
  }
  /*
  onModelChangeActiveStraightLegRaise($event){
    this.evaluacionFms.rateActiveStraightLegRaise = this.rateActiveStraightLegRaise;
  }
  */
  onModelChangeActiveStraightLegRaiseLeft($event){
    this.evaluacionFms.rateActiveStraightLegRaiseLeft = this.rateActiveStraightLegRaiseLeft;
  }
  onModelChangeActiveStraightLegRaiseRight($event){
    this.evaluacionFms.rateActiveStraightLegRaiseRight = this.rateActiveStraightLegRaiseRight;
  }
  onModelChangeTrunkStabilityPushup($event){
    this.evaluacionFms.rateTrunkStabilityPushup = this.rateTrunkStabilityPushup;
  }
  /*
  onModelChangeRotaryStability($event){
    this.evaluacionFms.rateRotaryStability = this.rateRotaryStability;
  }
  */
  onModelChangeRotaryStabilityRight($event){
    this.evaluacionFms.rateRotaryStabilityRight = this.rateRotaryStabilityRight;
  }
  onModelChangeRotaryStabilityLeft($event){
    this.evaluacionFms.rateRotaryStabilityLeft = this.rateRotaryStabilityLeft;
  }

}
