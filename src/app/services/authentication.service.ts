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
}

@Injectable({ providedIn: 'root'})

export class AuthenticateService {

  userID: string;
  currentUser: User = {
    name: '',
    lastName: '',
    phone: '',
    mail: '',
    role: '',
    uid: '' ,
    kine: '',
    kineID: '',
  };
 
  
 
  constructor(private AFauth: AngularFireAuth, 
    private authService: AuthenticateService, 
    private router: Router, 
    private db: AngularFirestore
    ){}
 
  registerUser(email: string, password: string, phone: string, name: string, lastName: string){

    this.currentUser.mail = email;
    if (email === 'alfredolhuissier@gmail.com' || email === 'matthieu.manas@gmail.com'){
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
         uid: uid,
         kine:'',
         kineID:'',
       })
      resolve(res)
    }).catch(err => reject(err));
   })
  }
 
async loginUser(email:string, password:string){

    this.currentUser.mail = email;
    
   return await new Promise<any>((resolve, reject) => {
     this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
      this.getInfo();  
      
      this.currentUser.uid = firebase.auth().currentUser.uid;
      let docRef =  this.db.collection("users").doc(firebase.auth().currentUser.uid);
      //this.currentUser.role = ;
         
      docRef.get().toPromise().then( doc => {
    
      if (doc.exists) {
          this.currentUser.name = doc.data().name;
          this.currentUser.lastName = doc.data().lastName;
          this.currentUser.mail = doc.data().mail;
          this.currentUser.role = doc.data().role;
          this.currentUser.phone = doc.data().phone;
          resolve(user) 
      } else {
          // doc.data() will be undefined in this case
          console.log("No existe");
      }
        }).catch(function(error) {
         console.log("Error de la base de datos: ", error);
        });
          
     }).catch(err => reject(err));

   })

   
  }


async getInfo(){
  let docRef = this.db.collection("users").doc(firebase.auth().currentUser.uid);
  var stuff = []; //for names
  var stoff = []; //for lastNames
  var steff = [];  //for role
  var stiff = []; 

  await docRef.get().toPromise().then( doc => {
  
    if (doc.exists) {
      stuff = stuff.concat(doc.data().name);
      stoff = stoff.concat(doc.data().lastName);
      steff = steff.concat(doc.data().role);
      stiff = stiff.concat(doc.data().phone);
     } else {
      // doc.data() will be undefined in this case
      console.log("No existe");
     }
    }).catch(function(error) {
     console.log("Error de la base de datos: ", error);
    });
    
    let X = stuff.toString();
    let Y = stoff.toString();
    let Z = steff.toString();
    let W = stiff.toString();
    this.currentUser.name = X;
    this.currentUser.lastName = Y;
    this.currentUser.role = Z;
    this.currentUser.phone = W;
    this.currentUser.uid = this.userDetails().uid;

  }
 
  resetPassword(email: string): Promise<any> {
    return this.AFauth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(){
    return new Promise((resolve, reject) => {
      this.AFauth.auth.signOut().then(() => {
        this.currentUser = {
          name: '',
          lastName: '',
          mail: '',
          phone: '',
          role: '',
          uid: '' ,
          kine: '',
          kineID: '',
        };
        this.router.navigate(['/login']);
        
      })
    })
  }
 
  userDetails(){
    return firebase.auth().currentUser;
  }

  getID(){
    return this.currentUser.uid
  }

  getName(){
    return this.currentUser.name
  }

  getLastName(){
    return this.currentUser.lastName
  }
  getRole(){
    return this.currentUser.role
  }
  getKine(){
    return this.currentUser.kine
  }
  getKineID(){
    return this.currentUser.kineID
}


  updateUser(){
    
  }

  isLoggedIn() {
    return this.currentUser != null;
  }

  whatRole(){
    return this.currentUser.role;
  }

  getPhone(){
    return this.currentUser.phone;
  }

  isAdmin(){
    return this.currentUser.role === 'admin';
  }

  isProfesor(){
    return this.currentUser.role === 'profesor';
  }

  isCliente(){
    return this.currentUser.role === 'cliente';
  }

  isVisita(){
    return this.currentUser.role === 'visita';
  }



}
