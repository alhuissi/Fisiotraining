import { Injectable } from "@angular/core";
//import { Timestamp } from '@google-cloud/firestore';
import { Timestamp } from 'firebase-firestore-timestamp';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { sesionFisio } from '../models/sesion';
import { firestore } from 'firebase';


export interface calendarioFisio {

    sesiones: sesionFisio[],
    eventos: [],
    nombre: string,
    apellido: string,
    userID: string,
    id: string,
}

@Injectable()
export class CalendarioService {
    private calendario: calendarioFisio;

    constructor(private db: AngularFirestore) {

    }

    setCalendario(calendario: calendarioFisio){
        this.calendario = calendario;
    }

    getCalendarios(){
        return this.db.collection('calendarios').snapshotChanges().pipe(map(rooms => {
            return rooms.map(a => {
              const data = a.payload.doc.data() as calendarioFisio;
              data.id = a.payload.doc.id;
              return data;
            })
          }));
    }

    getCalendario(){
        //return this.db.collection('evaluacion-diaria').doc(this.evaluacionDi.userid).valueChanges()
        return this.calendario;
    }

    getCalendarioID(uid: string){
        return this.db.collection('calendarios').doc(uid).valueChanges();
    }

    sendSesionToFirebase(sesion: sesionFisio, id: string){

        this.db.collection('calendarios').doc(id).update({
          messages : firestore.FieldValue.arrayUnion(sesion),
        })
      }

}
