import { Injectable } from "@angular/core";
import { Timestamp } from 'firebase-firestore-timestamp';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";


export interface evaluacionFms{
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
}

@Injectable({
  providedIn: 'root'
})
export class EvaluacionFmsService {
  evaluacionFms: evaluacionFms;

  constructor() { }

  setEvaluacion(evaluacionFms: evaluacionFms){
    this.evaluacionFms = evaluacionFms;
}

getEvaluacion(){
  return this.evaluacionFms;
}

}
