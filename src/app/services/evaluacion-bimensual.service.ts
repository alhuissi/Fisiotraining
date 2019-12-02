import { Injectable } from "@angular/core";
//import { Timestamp } from '@google-cloud/firestore';
import { Timestamp } from 'firebase-firestore-timestamp';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";

export interface evaluacionBimensual {

    nombre: string,
    userid: string,
    formid: string,
    fecha: Timestamp,
    edad: number,

    //Evaluacion Fisiotraining
    funcionCardiaca: number,
    fcMaxima: number,
    fcReposo: number,
    presionArterial: number,

    indiceCardiovascular: number,
    colesterol: number,
    ldl: number,
    tgl: number,
    
    fms: number,
    potencia: number,

    oxigeno: string,

    //Examen Kinésico
    dolor: string,
    diagnostico: string,
    motivo: string,

    //Observación
    planoFrontal: string,
    planoLateral: string,
    planoPosterior: string,
    fuerza: number,
    objetivo: string,
    objetivosEspecificos: string,
    objetivosGenerales: string,
    observacion: string,
    palpacion: string,
    pruebasEspeciales: string,
    rangosActivosPasivos: number,

    
    actividadDeportiva: string,
    antecedentes: string,
    ayudasTecnicas: string,
    examenKinesico: number,

    
    habitos: string,
    intervencionesQx: string,
    medicamentos: string,
    ocupacion: string,
    ocupacionActualTrabajo: string,
    traumas: string,

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



