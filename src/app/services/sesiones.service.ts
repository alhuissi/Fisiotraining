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

    setSesion(sesion: sesionFisio) {
        this.sesion = sesion;
    }

    getSesiones() {
        return this.db.collection('sesiones').snapshotChanges().pipe(map(rooms => {
            return rooms.map(a => {
                const data = a.payload.doc.data() as sesionFisio;
                data.id = a.payload.doc.id;
                return data;
            })
        }));
    }

    getSesion() {
        //return this.db.collection('evaluacion-diaria').doc(this.evaluacionDi.userid).valueChanges()
        return this.sesion;
    }

    getSesionID(uid: string) {
        let sesionID: sesionFisio;
        return this.db.collection('sesiones').doc(uid);
    }

    async setSesionFromID(uid: string) {
        await new Promise<any>((resolve, reject) => {
            let docRef = this.db.collection("sesiones").doc(uid);
            docRef.get().toPromise().then(doc => {
                if (doc.exists) {
                    let soli: sesionFisio = {
                        nombreKine: '',
                        nombreAlumno: '',
                        idKine: '',
                        idAlumno: '',
                        fechaEmision: '',
                        fecha: '',
                        id: '',
                    };
                    soli.nombreKine = doc.data().nombreKine,
                    soli.nombreAlumno = doc.data().nombreAlumno,
                    soli.idKine = doc.data().idKine,
                    soli.idAlumno = doc.data().idAlumno,
                    soli.fechaEmision = doc.data().fechaEmision,
                    soli.fecha = doc.data().fecha,
                    soli.id = doc.data().id,
                    this.setSesion(soli);
                    resolve();
                } else {
                    // doc.data() will be undefined in this case
                    console.log("Sesion No existe");
                }
            }).catch(function (error) {
                console.log("Error buscando sesion desde ID: ", error);
            }).catch(err => reject(err));
        });
        return this.sesion;
    }

    realizada(){
        this.db.collection('sesiones').doc(this.sesion.id).update({
            realizada: 'si',
          });
    }
}