import { Injectable } from "@angular/core";
//import { Timestamp } from '@google-cloud/firestore';
import { Timestamp } from 'firebase-firestore-timestamp';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";

export interface fichaClinica {
    nombre: string,
    edad: number,
    ocupacion: string,
    ayudasTecnicas: string,
    actividadDeportiva: string,
    fecha: Timestamp,
    intervencionesQX: string,
    traumas: string,
    ocupacionActualTrabajo: string,
    antecedentes: string,
    habitos: string,
    medicamentos: string,
    objetivos: string,
    userid: string,
    formid: string,
    dir: string,
}

@Injectable()
export class FichaClinicaService {
    private ficha: fichaClinica;

    constructor(private db: AngularFirestore) {

    }

    setFicha(ficha: fichaClinica){
        this.ficha = ficha;
    }

    getFichas(){
        return this.db.collection('fichas-clinicas').snapshotChanges().pipe(map(rooms => {
            return rooms.map(a => {
              const data = a.payload.doc.data() as fichaClinica;
              data.formid = a.payload.doc.id;
              return data;
            })
          }));
    }

    getFicha(){
        //return this.db.collection('evaluacion-diaria').doc(this.evaluacionDi.userid).valueChanges()
        return this.ficha;
    }

    getFichaID(uid: string){
        let fichaID: fichaClinica;
        return this.db.collection('fichas-clinicas').doc(uid);
    }

}



