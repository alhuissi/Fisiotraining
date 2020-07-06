import { Injectable } from "@angular/core";
//import { Timestamp } from '@google-cloud/firestore';
import { Timestamp } from 'firebase-firestore-timestamp';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";

export interface evaluacionBimensual {
    nombre: string,
    apellido: string,
    userid: string,
    formid: string,
    fecha: Timestamp,
    edad: number,

    nombreAutor: string,
    mailAutor: string,
    IDAutor: string,

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
    fmsPorcentaje: number,

    oxigeno: number,
    oxigenoPorcentaje: number,

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
    evaluacionBi: evaluacionBimensual ={
        nombre: '',
        apellido: '',
        userid: '',
        formid: '',
        fecha: Date.now(),
        edad: 0,
        nombreAutor: '',
        mailAutor: '',
        IDAutor: '',
    
        //Evaluacion Fisiotraining
        funcionCardiaca: 0,
        fcMaxima: 0,
        fcReposo: 0,
        presionArterial: 0,
    
        indiceCardiovascular: 0,
        colesterol: 0,
        ldl: 0,
        tgl: 0,
        
        fms: 0,
        fmsPorcentaje: 0,
    
        oxigeno: 0,
        oxigenoPorcentaje: 0,
    
        //Examen Kinésico
        dolor: '',
        diagnostico: '',
        motivo: '',
    
        //Observación
        planoFrontal: '',
        planoLateral: '',
        planoPosterior: '',
        fuerza: 0,
        objetivo: '',
        objetivosEspecificos: '',
        objetivosGenerales: '',
        observacion: '',
        palpacion: '',
        pruebasEspeciales: '',
        rangosActivosPasivos: 0,
    
        actividadDeportiva: '',
        antecedentes: '',
        ayudasTecnicas: '',
        examenKinesico: 0,
    
        habitos: '',
        intervencionesQx: '',
        medicamentos: '',
        ocupacion: '',
        ocupacionActualTrabajo: '',
        traumas: '',
    };
    

    constructor(private db: AngularFirestore){
    }

    setEvaluacion(evaluacionBi: evaluacionBimensual){
        this.evaluacionBi = evaluacionBi;
    }

    setFms(puntaje: number){
        this.evaluacionBi.fms = puntaje;
    }

    getFms(){
        if(this.evaluacionBi.fms){
            return this.evaluacionBi.fms;
        }
        else{
            return
        }
        
    }

    reset(){
        this.evaluacionBi ={
            nombre: '',
            apellido: '',
            userid: '',
            formid: '',
            fecha: Date.now(),
            edad: 0,
            nombreAutor: '',
            mailAutor: '',
            IDAutor: '',
        
            //Evaluacion Fisiotraining
            funcionCardiaca: 0,
            fcMaxima: 0,
            fcReposo: 0,
            presionArterial: 0,
        
            indiceCardiovascular: 0,
            colesterol: 0,
            ldl: 0,
            tgl: 0,
            
            fms: 0,
            fmsPorcentaje: 0,
        
            oxigeno: 0,
            oxigenoPorcentaje: 0,
        
            //Examen Kinésico
            dolor: '',
            diagnostico: '',
            motivo: '',
        
            //Observación
            planoFrontal: '',
            planoLateral: '',
            planoPosterior: '',
            fuerza: 0,
            objetivo: '',
            objetivosEspecificos: '',
            objetivosGenerales: '',
            observacion: '',
            palpacion: '',
            pruebasEspeciales: '',
            rangosActivosPasivos: 0,
        
            actividadDeportiva: '',
            antecedentes: '',
            ayudasTecnicas: '',
            examenKinesico: 0,
        
            habitos: '',
            intervencionesQx: '',
            medicamentos: '',
            ocupacion: '',
            ocupacionActualTrabajo: '',
            traumas: '',
        };
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



