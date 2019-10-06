import { Injectable } from "@angular/core";
//import { Timestamp } from '@google-cloud/firestore';
import { Timestamp } from 'firebase-firestore-timestamp';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";



export interface sesionFisio {
    nombreKine: string,
    nombreAlumno: string,
    idKine: string,
    idAlumno: string,
    fechaEmision: string,
    fecha: string,
    id: string,
}

@Injectable()
export class SesionService {
    private sesion: sesionFisio;

    constructor(private db: AngularFirestore) {

    }

    setSesion(sesion: sesionFisio){
        this.sesion = sesion;
    }

    getSesiones(){
        return this.db.collection('sesiones').snapshotChanges().pipe(map(rooms => {
            return rooms.map(a => {
              const data = a.payload.doc.data() as sesionFisio;
              data.id = a.payload.doc.id;
              return data;
            })
          }));
    }

    getSesion(){
        //return this.db.collection('evaluacion-diaria').doc(this.evaluacionDi.userid).valueChanges()
        return this.sesion;
    }

    getSesionID(uid: string){
        let sesionID: sesionFisio;
        return this.db.collection('sesiones').doc(uid);
    }

}