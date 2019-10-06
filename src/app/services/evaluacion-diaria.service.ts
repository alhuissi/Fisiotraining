import { Injectable } from "@angular/core";
import { Timestamp } from 'firebase-firestore-timestamp';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";

export interface evaluacionDiaria {
    alimentacion: number,
    autopercepcion: number,
    circuito1: number,
    circuito2: number,
    circuito3: number,
    core: number,
    brazos: number,
    fecha: Timestamp,
    piernas: number,
    hidratacion: number,
    cardio: number,
    nombre: string,
    apellido: string,
    stress: number,
    sueno: number,
    userid: string,
    formid: string,
    mailAutor: string,
    nombreAutor: string,
    IDAutor: string,
}

@Injectable()
export class EvaluacionDiariaService {
    evaluacionDi: evaluacionDiaria;   

    constructor(private db: AngularFirestore) {

    }

    setEvaluacion(evaluacionDi: evaluacionDiaria){
        this.evaluacionDi = evaluacionDi;
    }

    getEvaluaciones(){
        return this.db.collection('evaluacion-diaria').snapshotChanges().pipe(map(rooms => {
            return rooms.map(a => {
              const data = a.payload.doc.data() as evaluacionDiaria;
              data.formid = a.payload.doc.id;
              return data;
            })
          }));
    }

    getEvaluacion(){
        //return this.db.collection('evaluacion-diaria').doc(this.evaluacionDi.userid).valueChanges()
        return this.evaluacionDi
    }


}
