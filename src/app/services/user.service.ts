import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';

export interface user {
    name: string,
    lastName: string,
    phone: string,
    uid: string,
    mail: string,
    role: string
    kine: string,
    kineID: string,
    debeEvaluar: string,
    nMotivacion: number,
    nProfesionalismo: number,
    nPuntualidad: number,
    idEvaluacionPendiente: string,
    horasTrabajadas: number,
    horasTrabajadasMesAnterior: number,
    nEntrenamientos: number,
    nFisiotrainings: number,
    nVecesEvaluado: number,
    mesActual: number,
    birth: string,
    direccion: string,
    h20: number, 
    fcard: number,
    alim: number,
    indcardv: number,
    sueno: number,
    fms: number,
    fuerza: number,
    o2: number,
    stress: number
}

@Injectable()
export class UserService {
    private user: user = {
        name: '',
        lastName: '',
        phone: '',
        mail: '',
        role: '',
        uid: '',
        kine: '',
        kineID: '',
        debeEvaluar: '',
        idEvaluacionPendiente: '',
        nMotivacion: 0,
        nProfesionalismo: 0,
        nPuntualidad: 0,
        horasTrabajadas: 0,
        horasTrabajadasMesAnterior: 0,
        nEntrenamientos: 0,
        nFisiotrainings: 0,
        nVecesEvaluado: 0,
        mesActual: 0,
        birth: '',
        direccion: '',
        h20: 0,
        fcard: 0,
        alim: 0,
        indcardv: 0,
        sueno: 0,
        fms: 0,
        fuerza: 0,
        o2: 0,
        stress: 0
    }

    constructor(
        private db: AngularFirestore
    ) {

    }

    setUser(user: user) {
        this.user = user
    }

    async setUserFromID(id: string) {

        if (id != '') {
          let docRef = this.db.collection("users").doc(id);
          var stuff = []; //for names
          var stoff = []; //for lastNames
          var steff = [];  //for role
          var stiff = [];  //phone
          var stiaff = [];  //kineID
          var stioff = [];  //kine nombre
          var stiuff = [];  //debe Evaluar?
          var stieff = [];  //id evaluación pendiente
          var stiyff = [];  //horasTrabajadas
          var stizff = [];  //nEntrenamientos
          let snentr = []; //nFisiotrainings
          var stiwff = [];  //horasTrabajadasMesAnterior
          var stixff = [];  //mesActual
          let sVecesEvaluado = [];
          let sMotivacion = [];
          let sProfesionalismo = [];
          let sPuntualidad = [];
          let semail = [];
          let sdir = [];
          let sh20 = []; //h20
          let sfcard = []; //fcard
          let salim = [];
          let sindcardv = [];
          let ssueno = [];
          let sfms = [];
          let sfuerza = [];
          let so2 = [];
          let sstress = [];
    
    
          await docRef.get().toPromise().then(doc => {
    
            if (doc.exists) {
              stuff = stuff.concat(doc.data().name);
              stoff = stoff.concat(doc.data().lastName);
              semail = semail.concat(doc.data().mail);
              steff = steff.concat(doc.data().role);
              stiff = stiff.concat(doc.data().phone);
              stiaff = stiaff.concat(doc.data().kineID);
              stioff = stioff.concat(doc.data().kine);
              stiuff = stiuff.concat(doc.data().debeEvaluar);
              stieff = stieff.concat(doc.data().idEvaluacionPendiente);
              stiyff = stiyff.concat(doc.data().horasTrabajadas);
              stizff = stizff.concat(doc.data().nEntrenamientos);
              stiwff = stiwff.concat(doc.data().horasTrabajadasMesAnterior);
              stixff = stixff.concat(doc.data().mesActual);
              snentr = snentr.concat(doc.data().nFisiotrainings);
              sVecesEvaluado = sVecesEvaluado.concat(doc.data().nVecesEvaluado);
              sMotivacion = sMotivacion.concat(doc.data().nMotivacion);
              sProfesionalismo = sProfesionalismo.concat(doc.data().nProfesionalismo);
              sPuntualidad = sPuntualidad.concat(doc.data().nPuntualidad);
              sdir = sdir.concat(doc.data().direccion);
              sh20 = sh20.concat(doc.data().h20); //h20
              sfcard = sfcard.concat(doc.data().sfcard); //fcard
              salim = salim.concat(doc.data().salim);
              sindcardv = sindcardv.concat(doc.data().indcardv);
              ssueno = ssueno.concat(doc.data().sueno);
              sfms = sfms.concat(doc.data().fms);
              sfuerza = sfuerza.concat(doc.data().fuerza);
              so2 = so2.concat(doc.data().so2);
              sstress = sstress.concat(doc.data().stress);
            } else {
              // doc.data() will be undefined in this case
              console.log("No existe");
            }
          }).catch(function (error) {
            console.log("Error de la base de datos: ", error);
          });
    
          let X = stuff.toString();
          let Y = stoff.toString();
          let Z = steff.toString();
          let W = stiff.toString();
          let U = stiaff.toString();
          let Q = stioff.toString();
          let P = stiuff.toString();
          let R = stieff.toString();
          let S = stiyff.toString();
          let T = stizff.toString();
          let A = stiwff.toString();
          let B = stixff.toString();
          let N = snentr.toString();
          let XMotivacion = sMotivacion.toString();
          let XProfesionalismo = sProfesionalismo.toString();
          let XPuntualidad = sPuntualidad.toString();
          let XVecesEvaluado = sVecesEvaluado.toString();
          let Xmail = semail.toString();
          let Xdir = sdir.toString();
          let Xh20 = sh20.toString();
          let Xfcard = sfcard.toString();
          let Xalim = salim.toString();
          let Xindcardv = sindcardv.toString();
          let Xsueno = ssueno.toString();
          let Xfms = sfms.toString();
          let Xfuerza = sfuerza.toString();
          let Xo2 = so2.toString();
          let Xstress = sstress.toString();
    
          this.user.name = X;
          this.user.lastName = Y;
          this.user.role = Z;
          this.user.phone = W;
          this.user.kineID = U;
          this.user.kine = Q;
          this.user.debeEvaluar = P;
          this.user.idEvaluacionPendiente = R;
          this.user.uid = id;
          this.user.mail = Xmail;
          this.user.nMotivacion = Number(XMotivacion);
          this.user.nProfesionalismo = Number(XProfesionalismo);
          this.user.nPuntualidad = Number(XPuntualidad);
          this.user.nVecesEvaluado = Number(XVecesEvaluado);
          this.user.horasTrabajadas = Number(S);
          this.user.nEntrenamientos = Number(T);
          this.user.nFisiotrainings = Number(N);
          this.user.horasTrabajadasMesAnterior = Number(A);
          this.user.mesActual = Number(B);
          this.user.direccion = Xdir;
          this.user.h20 = Number(Xh20);
          this.user.fcard = Number(Xfcard);
          this.user.alim = Number(Xalim);
          this.user.indcardv = Number(Xindcardv);
          this.user.sueno = Number(Xsueno);
          this.user.fms = Number(Xfms);
          this.user.fuerza = Number(Xfuerza);
          this.user.o2 = Number(Xo2);
          this.user.stress = Number(Xstress);
        }
    }

    getUID() {
        return this.user.uid
    }

    getName() {
        return this.user.name
    }
    getLastName() {
        return this.user.lastName
    }
    getEmail() {
        return this.user.mail
    }
    getRole() {
        return this.user.role
    }
    getKine() {
        return this.user.kine
    }
    getKineID() {
        return this.user.kineID
    }
    getPhone() {
        return this.user.phone;
      }
    getNEntrenamientos() {
        return this.user.nEntrenamientos
    }
    getNFisiotrainings() {
        return this.user.nFisiotrainings
    }
    getNVecesEvaluado(){
        return this.user.nVecesEvaluado;
    }
    getNMotivacion(){
        return this.user.nMotivacion;
    }
    getNProfesionalismo(){
        return this.user.nProfesionalismo;
    }
    getNPuntualidad(){
        return this.user.nPuntualidad;
    }
    getallusers() {
        return this.db.collection('users', ref => ref.orderBy('name')).valueChanges();
    }
    getDebeEvaluar() {
        return this.user.debeEvaluar;
    }
    getIDEvaluacionPendiente() {
        return this.user.idEvaluacionPendiente;
    }
    getHorasTrabajadas() {
        return this.user.horasTrabajadas;
    }
    getHorasTrabajadasMesAnterior(){
        return this.user.horasTrabajadasMesAnterior;
    }
    getBirth(){
        return this.user.birth;
    }
    getDireccion(){
        return this.user.direccion;
    }
    geth20(){
        return this.user.h20;
    }
    getfcard(){
        return this.user.fcard;
    }
    getalim(){
        return this.user.alim;
    }
    getindcardv(){
        return this.user.indcardv;
    }
    getsueno(){
        return this.user.sueno;
    }
    getfms(){
        return this.user.fms;
    }
    getfuerza(){
        return this.user.fuerza;
    }
    geto2(){
        return this.user.o2;
    }
    getstress(){
        return this.user.stress;
    }
    getEdad(){
        let ano = this.user.birth.substring(0,4);
        let mes = this.user.birth.substring(5,7);
        let dia = this.user.birth.substring(8,10);
        let x = this.calculate_age(ano,mes,dia);
        return x;
    }

    calculate_age(birth_year,birth_month,birth_day){
        let today_date = new Date();
        let today_year = today_date.getFullYear();
        let today_month = today_date.getMonth();
        let today_day = today_date.getDate();
        let age = today_year - birth_year;
    
        if ( today_month < (Number(birth_month) - 1))
        {
            age--;
        }
        if (((Number(birth_month) - 1) == today_month) && (today_day < Number(birth_day)))
        {
            age--;
        }
        return age;
      }


    changeRole(newRol: string) {
        this.db.collection('users').doc(this.user.uid).update({
            role: newRol,
        });
        this.user.role = newRol;
    }

    changeMesActual(newMesActual: number) {
        this.db.collection('users').doc(this.user.uid).update({
            mesActual: newMesActual,
        });
        this.user.mesActual = newMesActual;
    }

    debeEvaluar(id: string) {
        this.db.collection('users').doc(this.user.uid).update({
            debeEvaluar: 'si',
            idEvaluacionPendiente: id,
        });
        this.user.debeEvaluar = 'si';
        this.user.idEvaluacionPendiente = id;
    }

    sumarEntrenamiento() {
        let x = this.user.nEntrenamientos + 1;
        this.db.collection('users').doc(this.user.uid).update({
            nEntrenamientos: x,
        });
        this.user.nEntrenamientos = x;
    }

    sumarFisiotraining() {
        let x = this.user.nFisiotrainings + 1;
        this.db.collection('users').doc(this.user.uid).update({
            nFisiotrainings: x,
        });
        this.user.nFisiotrainings = x;
    }

    async sumarPromedioEntrenamientos(nh20, nalim, nsueno, nstress){
        let x = this.user.h20 + nh20;
        let x2 = this.user.alim + nalim;
        let x3 = this.user.sueno + nsueno;
        let x5 = this.user.stress + nstress;
        await this.db.collection('users').doc(this.user.uid).update({
            h20: x,
            alim: x2,
            sueno: x3,
            stress: x5,
        })
        this.user.h20 = x;
        this.user.alim = x2;
        this.user.sueno = x3;
        this.user.stress = x5;
    }

    async sumarPromedioFisiotrainings(nfcard, nindcardv, nfms, nfuerza, no2){
        let x = this.user.h20 + nfcard;
        let x2 = this.user.alim + nindcardv;
        let x3 = this.user.sueno + nfms;
        let x4 = this.user.fuerza + nfuerza;
        let x5 = this.user.fuerza + no2;
        await this.db.collection('users').doc(this.user.uid).update({
            fcard: x,
            indcardv: x2,
            fms: x3,
            fuerza: x4,
            o2: x5,
        })
        this.user.fcard = x;
        this.user.indcardv = x2;
        this.user.fms = x3;
        this.user.fuerza = x4;
        this.user.o2 = x5;
    }

    async sumarPromedioSesiones(nMotivacion, nProfesionalismo, nPuntualidad){
        let x = this.user.nMotivacion + nMotivacion;
        let x2 = this.user.nProfesionalismo + nProfesionalismo;
        let x3 = this.user.nPuntualidad + nPuntualidad;
        let y = this.user.nVecesEvaluado + 1;
        await this.db.collection('users').doc(this.user.uid).update({
            nMotivacion: x,
            nProfesionalismo: x2,
            nPuntualidad: x3,
            nVecesEvaluado: y
        })
        this.user.nMotivacion = x;
        this.user.nProfesionalismo = x2;
        this.user.nPuntualidad = x3;
        this.user.nVecesEvaluado = y;
    }

}

