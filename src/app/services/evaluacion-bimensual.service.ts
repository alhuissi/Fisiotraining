import { Injectable } from "@angular/core";
//import { Timestamp } from '@google-cloud/firestore';
import { Timestamp } from 'firebase-firestore-timestamp';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";

export interface evaluacionBimensual {
    actividadDeportiva: string,
    antecedentes: string,
    ayudasTecnicas: string,
    colesterol: number,
    diagnostico: string,
    dolor: string,
    edad: number,
    examenKinesico: number,
    fcMaxima: number,
    fcReposo: number,
    fecha: Timestamp,
    fms: number,
    fuerza: number,
    funcionCardiaca: number,
    habitos: string,
    indiceCardiovascular: number,
    intervencionesQx: string,
    ldl: number,
    medicamentos: string,
    motivo: string,
    nombre: string,
    objetivo: string,
    objetivosEspecificos: string,
    objetivosGenerales: string,
    observacion: string,
    ocupacion: string,
    ocupacionActualTrabajo: string,
    oxigeno: string,
    palpacion: string,
    planoFrontal: string,
    planoLateral: string,
    planoPosterior: string,
    potencia: number,
    presionArterial: number,
    pruebasEspeciales: string,
    rangosActivosPasivos: number,
    tgl: number,
    traumas: string,
    userid: string,
    formid: string,
}

@Injectable()
export class EvaluacionBimensualService {
    private evaluacionBi: evaluacionBimensual

    constructor(private db: AngularFirestore) {

    }

    setEvaluacion(evaluacionBi: evaluacionBimensual){
        this.evaluacionBi = evaluacionBi;
    }

    getEvaluaciones(){
        return this.db.collection('evaluacion-diaria').snapshotChanges().pipe(map(rooms => {
            return rooms.map(a => {
              const data = a.payload.doc.data() as evaluacionBimensual;
              data.formid = a.payload.doc.id;
              return data;
            })
          }));
    }

    getEvaluacion(){
        //return this.db.collection('evaluacion-diaria').doc(this.evaluacionDi.userid).valueChanges()
        return this.evaluacionBi
    }

}



