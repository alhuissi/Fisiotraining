import { Injectable } from "@angular/core";
import { Timestamp } from 'firebase-firestore-timestamp';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";

export interface evaluacionSesion {
  ratingMotivacion: number,
  ratingProfesionalismo: number,
  ratingPuntualidad: number,
  idProfe: string,
  idAlumno: string,
  nombreProfe: string,
  nombreAlumno: string,
  fecha: Timestamp,
  formid: string,
  hecha: boolean,
  idSesion: string,
  idEvaluacion: string,
}

@Injectable({
  providedIn: 'root'
})
export class EvaluacionSesionService {

  evaluacionSesion: evaluacionSesion;   

    constructor(private db: AngularFirestore) {

    }

    setEvaluacion(evaluacionSesion: evaluacionSesion){
        this.evaluacionSesion = evaluacionSesion;
    }

    getEvaluaciones(){
        return this.db.collection('evaluacion-sesion').snapshotChanges().pipe(map(rooms => {
            return rooms.map(a => {
              const data = a.payload.doc.data() as evaluacionSesion;
              data.formid = a.payload.doc.id;
              return data;
            })
          }));
    }

    getEvaluacion(){
        //return this.db.collection('evaluacion-diaria').doc(this.evaluacionDi.userid).valueChanges()
        return this.evaluacionSesion
    }

    guardarEvaluacion(){

    }

}
