import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

export interface User {
  name: string,
  lastName: string,
  mail: string,
  phone: string,
  role: string,
  uid: string,
  kine: string,
  kineID: string,
  debeEvaluar: string,
  idEvaluacionPendiente: string,
  nMotivacion: number,
  nProfesionalismo: number,
  nPuntualidad: number,
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

@Injectable({ providedIn: 'root' })

export class AuthenticateService {

  public isLogged: boolean = false;
  fechaToday = new Date();

  userID: string;
  currentUser: User = {
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
  };



  constructor(private AFauth: AngularFireAuth,
    private authService: AuthenticateService,
    private router: Router,
    private db: AngularFirestore
  ) { }

  registerUser(email: string, password: string, phone: string, name: string, lastName: string, birth: any, direccion: string) {

    this.currentUser.mail = email;
    if (email === 'alfredolhuissier@gmail.com' || email === 'matthieu.manas@gmail.com') {
      this.currentUser.role = 'admin';
      console.log('administrador');
    }

    return new Promise<any>((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(res => {
        // console.log(res.user.uid) 
        const uid = res.user.uid;
        this.db.collection('users').doc(uid).set({
          name: name,
          lastName: lastName,
          phone: phone,
          mail: email.toLowerCase(),    //para evitar problemas con mayúsculas
          role: 'visita',
          birth: birth,
          uid: uid,
          kine: '',
          kineID: '',
          debeEvaluar: 'no',
          idEvaluacionPendiente: '',
          nMotivacion: 0,
          nProfesionalismo: 0,
          nPuntualidad: 0,
          horasTrabajadas: 0,
          horasTrabajadasMesAnterior: 0,
          nEntrenamientos: 0,
          nFisiotrainings: 0,
          nVecesEvaluado: 0,
          mesActual: this.fechaToday.getMonth(),
          direccion: direccion,
          h20: 0,
          fcard: 0,
          alim: 0,
          indcardv: 0,
          sueno: 0,
          fms: 0,
          fuerza: 0,
          o2: 0,
          stress: 0
        })
        resolve(res)
      }).catch(err => reject(err));
    })
  }

  async loginUser(email: string, password: string) {

    this.currentUser.mail = email;

    return await new Promise<any>((resolve, reject) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        this.getInfo();

        this.currentUser.uid = firebase.auth().currentUser.uid;
        let docRef = this.db.collection("users").doc(firebase.auth().currentUser.uid);
        //this.currentUser.role = ;

        docRef.get().toPromise().then(doc => {

          if (doc.exists) {
            this.currentUser.name = doc.data().name;
            this.currentUser.lastName = doc.data().lastName;
            this.currentUser.mail = doc.data().mail;
            this.currentUser.role = doc.data().role;
            this.currentUser.phone = doc.data().phone;
            this.currentUser.birth = doc.data().birth;
            this.currentUser.uid = doc.data().uid;
            this.currentUser.kine = doc.data().kine;
            this.currentUser.kineID = doc.data().kineID;
            this.currentUser.debeEvaluar = doc.data().debeEvaluar;
            this.currentUser.idEvaluacionPendiente = doc.data().idEvaluacionPendiente;
            this.currentUser.horasTrabajadas = doc.data().horasTrabajadas;
            this.currentUser.horasTrabajadasMesAnterior = doc.data().horasTrabajadasMesAnterior;
            this.currentUser.nEntrenamientos = doc.data().nEntrenamientos;
            this.currentUser.mesActual = this.fechaToday.getMonth();
            this.currentUser.direccion = doc.data().direccion;
            this.currentUser.h20 = doc.data().h20;
            this.currentUser.fcard = doc.data().fcard;
            this.currentUser.alim = doc.data().alim;
            this.currentUser.indcardv = doc.data().indcardv;
            this.currentUser.sueno = doc.data().sueno;
            this.currentUser.fms = doc.data().fms;
            this.currentUser.fuerza = doc.data().fuerza;
            this.currentUser.o2 = doc.data().o2;
            this.currentUser.stress = doc.data().stress;
            resolve(user)
          } else {
            // doc.data() will be undefined in this case
            console.log("No existe");
          }
        }).catch(function (error) {
          console.log("Error de la base de datos: ", error);
        });
      }).catch(err => reject(err));
    })
  }

  async getInfo() {

    if (firebase.auth().currentUser.uid != '') {
      let docRef = this.db.collection("users").doc(firebase.auth().currentUser.uid);
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
          sdir = sdir.concat(doc.data().direccion);
          sh20 = sh20.concat(doc.data().h20); //h20
          sfcard = sfcard.concat(doc.data().fcard); //fcard
          salim = salim.concat(doc.data().alim);
          sindcardv = sindcardv.concat(doc.data().indcardv);
          ssueno = ssueno.concat(doc.data().sueno);
          sfms = sfms.concat(doc.data().fms);
          sfuerza = sfuerza.concat(doc.data().fuerza);
          so2 = so2.concat(doc.data().o2);
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

      this.currentUser.name = X;
      this.currentUser.lastName = Y;
      this.currentUser.role = Z;
      this.currentUser.phone = W;
      this.currentUser.kineID = U;
      this.currentUser.kine = Q;
      this.currentUser.debeEvaluar = P;
      this.currentUser.idEvaluacionPendiente = R;
      this.currentUser.uid = this.userDetails().uid;
      this.currentUser.mail = this.userDetails().email;
      this.currentUser.horasTrabajadas = Number(S);
      this.currentUser.nEntrenamientos = Number(T);
      this.currentUser.nFisiotrainings = Number(N);
      this.currentUser.horasTrabajadasMesAnterior = Number(A);
      this.currentUser.mesActual = Number(B);
      this.currentUser.direccion = Xdir;
      this.currentUser.h20 = Number(Xh20);
      this.currentUser.fcard = Number(Xfcard);
      this.currentUser.alim = Number(Xalim);
      this.currentUser.indcardv = Number(Xindcardv);
      this.currentUser.sueno = Number(Xsueno);
      this.currentUser.fms = Number(Xfms);
      this.currentUser.fuerza = Number(Xfuerza);
      this.currentUser.o2 = Number(Xo2);
      this.currentUser.stress = Number(Xstress);
    }
  }

  resetPassword(email: string): Promise<any> {
    return this.AFauth.auth.sendPasswordResetEmail(email);
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      this.AFauth.auth.signOut().then(() => {
        this.currentUser = {
          name: '',
          lastName: '',
          mail: '',
          phone: '',
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
        };
        this.router.navigate(['/login']);

      })
    })
  }

  userDetails() {
    return firebase.auth().currentUser;
  }

  getID() {
    return this.currentUser.uid
  }

  getName() {
    return this.currentUser.name
  }

  getLastName() {
    return this.currentUser.lastName
  }
  getRole() {
    return this.currentUser.role
  }
  getKine() {
    return this.currentUser.kine
  }
  getKineID() {
    return this.currentUser.kineID
  }
  getHorasTrabajadas() {
    return this.currentUser.horasTrabajadas
  }

  async sumarHoraTrabajada() {
    let x = this.currentUser.horasTrabajadas + 1;

    this.db.collection('users').doc(this.currentUser.uid).update({
      horasTrabajadas: x,
    });
  }

  changeMesActual(newMesActual: number){
    this.db.collection('users').doc(this.currentUser.uid).update({
        mesActual: newMesActual,
        horasTrabajadasMesAnterior: this.currentUser.horasTrabajadas,
        horasTrabajadas: 0,
      });
    this.currentUser.mesActual = newMesActual;
    this.currentUser.horasTrabajadasMesAnterior = this.currentUser.horasTrabajadas;
    this.currentUser.horasTrabajadas = 0;
}

  updateUser() {
  }

  isLoggedIn() {
    return this.currentUser != null;
  }

  whatRole() {
    return this.currentUser.role;
  }

  getPhone() {
    return this.currentUser.phone;
  }

  getDebeEvaluar() {
    return this.currentUser.debeEvaluar;
  }

  getIDEvaluacionPendiente() {
    return this.currentUser.idEvaluacionPendiente;
  }

  isAdmin() {
    return this.currentUser.role === 'admin';
  }

  isProfesor() {
    return this.currentUser.role === 'profesor';
  }

  isCliente() {
    return this.currentUser.role === 'cliente';
  }

  isVisita() {
    return this.currentUser.role === 'visita';
  }



}
