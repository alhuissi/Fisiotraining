import { Injectable } from "@angular/core";
//import { Timestamp } from '@google-cloud/firestore';
import { Timestamp } from 'firebase-firestore-timestamp';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";



export interface solicitudFisio {
    nombre: string,
    apellido: string,
    mail: string,
    idAlumno: string,
    fechaEmision: string,
    fecha: string,
    phone: string,
    id: string,
    kine: string,
    kineID: string,
    title: string,
    desc: string,
    startTime: Date,
    endTime: Date,
    allDay: boolean,
}

@Injectable()
export class SolicitudService {
    private solicitud: solicitudFisio;

    constructor(private db: AngularFirestore) {

    }

    setSolicitud(solicitud: solicitudFisio) {
        this.solicitud = solicitud;
    }

    getSolicitudes() {
        return this.db.collection('solicitudes').snapshotChanges().pipe(map(rooms => {
            return rooms.map(a => {
                const data = a.payload.doc.data() as solicitudFisio;
                data.id = a.payload.doc.id;
                return data;
            })
        }));
    }

    getSolicitud() {
        //return this.db.collection('evaluacion-diaria').doc(this.evaluacionDi.idAlumno).valueChanges()
        return this.solicitud;
    }

    async setSolicitudFromID(uid: string) {
        await new Promise<any>((resolve, reject) => {
            let docRef = this.db.collection("solicitudes").doc(uid);
            docRef.get().toPromise().then(doc => {
                if (doc.exists) {
                    let soli: solicitudFisio = {
                        nombre: '',
                        apellido: '',
                        mail: '',
                        idAlumno: '',
                        fechaEmision: '',
                        fecha: '',
                        phone: '',
                        id: '',
                        kine: '',
                        kineID: '',
                        title: '',
                        desc: '',
                        startTime: new Date,
                        endTime: new Date,
                        allDay: false,
                    };
                    soli.nombre = doc.data().nombre,
                    soli.apellido = doc.data().apellido,
                    soli.mail = doc.data().mail,
                    soli.idAlumno = doc.data().idAlumno,
                    soli.fechaEmision = doc.data().fechaEmision,
                    soli.fecha = doc.data().fecha,
                    soli.phone = doc.data().phone,
                    soli.id = doc.data().id,
                    soli.kine = doc.data().kine,
                    soli.kineID = doc.data().kineID,
                    soli.title = doc.data().title,
                    soli.desc = doc.data().desc,
                    soli.startTime = doc.data().startTime,
                    soli.endTime = doc.data().endTime,
                    soli.allDay = doc.data().allDay,
                    this.setSolicitud(soli);
                    resolve();
                } else {
                    // doc.data() will be undefined in this case
                    console.log("Solicitud No existe");
                }
            }).catch(function (error) {
                console.log("Error buscando solicitud desde ID: ", error);
            }).catch(err => reject(err));
        });
        return this.solicitud;
    }

    getSolicitudID(uid: string) {
        return this.db.collection("solicitudes").doc(uid);
    }

    async getSolicitudFromID(uid: string) {
        //let fichaID: solicitudFisio;
        await new Promise<any>((resolve, reject) => {
            let docRef = this.db.collection("solicitudes").doc(uid);
            docRef.get().toPromise().then(doc => {
                if (doc.exists) {
                    let soli: solicitudFisio = {
                        nombre: '',
                        apellido: '',
                        mail: '',
                        idAlumno: '',
                        fechaEmision: '',
                        fecha: '',
                        phone: '',
                        id: '',
                        kine: '',
                        kineID: '',
                        title: '',
                        desc: '',
                        startTime: new Date,
                        endTime: new Date,
                        allDay: false,
                    };
                    soli.nombre = doc.data().nombre,
                        soli.apellido = doc.data().apellido,
                        soli.mail = doc.data().mail,
                        soli.idAlumno = doc.data().idAlumno,
                        soli.fechaEmision = doc.data().fechaEmision,
                        soli.fecha = doc.data().fecha,
                        soli.phone = doc.data().phone,
                        soli.id = doc.data().id,
                        soli.kine = doc.data().kine,
                        soli.kineID = doc.data().kineID,
                        soli.title = doc.data().title,
                        soli.desc = doc.data().desc,
                        soli.startTime = doc.data().startTime,
                        soli.endTime = doc.data().endTime,
                        soli.allDay = doc.data().allDay,
                        this.setSolicitud(soli);
                    resolve();
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No existe");
                }
            }).catch(function (error) {
                console.log("Error de la base de datos: ", error);
            }).catch(err => reject(err));

        });
        return this.solicitud;
    }

    getSolicitudUserID() {
        return this.solicitud.idAlumno;
    }

    getIDSol() {
        return this.solicitud.id;
    }


}