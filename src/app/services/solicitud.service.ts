import { Injectable } from "@angular/core";
//import { Timestamp } from '@google-cloud/firestore';
import { Timestamp } from 'firebase-firestore-timestamp';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";



export interface solicitudFisio {
    nombre: string,
    apellido: string,
    mail: string,
    userID: string,
    fechaEmision: string,
    fecha: string,
    phone: string,
    id: string,
}

@Injectable()
export class SolicitudService {
    private solicitud: solicitudFisio;

    constructor(private db: AngularFirestore) {

    }

    setSolicitud(solicitud: solicitudFisio){
        this.solicitud = solicitud;
    }

    getSolicitudes(){
        return this.db.collection('solicitudes').snapshotChanges().pipe(map(rooms => {
            return rooms.map(a => {
              const data = a.payload.doc.data() as solicitudFisio;
              data.id = a.payload.doc.id;
              return data;
            })
          }));
    }

    getSolicitud(){
        //return this.db.collection('evaluacion-diaria').doc(this.evaluacionDi.userid).valueChanges()
        return this.solicitud;
    }

    getSolicitudID(uid: string){
        let fichaID: solicitudFisio;
        return this.db.collection('solicitudes').doc(uid);
    }

    getSolicitudUserID(){
        return this.solicitud.userID;
    }


    getIDSol(){
        return this.solicitud.id;
    }


}