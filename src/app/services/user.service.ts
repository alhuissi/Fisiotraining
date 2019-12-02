import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';

export interface user {
    name: string,
    lastName: string,
    uid: string,
    mail: string,
    role: string
    kine: string,
    kineID: string,
}

@Injectable()
export class UserService {
    private user: user

    constructor(
        private db: AngularFirestore
    ) {

    }

    setUser(user: user){
        this.user = user
    }

    getUID(){
        return this.user.uid
    }

    getName(){
        return this.user.name
    }
    getLastName(){
        return this.user.lastName
}
    getEmail(){
        return this.user.mail
    }
    getRole(){
        return this.user.role
    }
    getKine(){
        return this.user.kine
    }
    getKineID(){
        return this.user.kineID
    }

    getallusers() {
        return this.db.collection('users', ref => ref.orderBy('name')).valueChanges();
      }

    changeRole(newRol: string){

        this.db.collection('users').doc(this.user.uid).update({
            role: newRol,
          });
        this.user.role = newRol;
    }
}

