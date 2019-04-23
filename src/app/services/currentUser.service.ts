
//actualmente sin uso

import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';

interface user {
    name: string,
    lastName: string,
    uid: string,
    mail: string,
    role: string
}

@Injectable()
export class CurrentUserService {
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
    changeRole(newRol: string){

        this.db.collection('users').doc(this.user.uid).update({
            role: newRol,
          })
        this.user.role = newRol;
    }
}

