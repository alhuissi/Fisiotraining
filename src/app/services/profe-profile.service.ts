import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface profe {
  name: string,
  lastName: string,
  uid: string,
  mail: string,
  role: string,
  image: string,
  ratingMotivacion: number,
  ratingProfesionalismo: number,
  ratingPuntualidad: number,
  promRatingMotivacion: number,
  promRatingProfesionalismo: number,
  promRatingPuntualidad: number,
}

@Injectable()
export class ProfeProfileService {
  private profe: profe

  constructor(
      private db: AngularFirestore
  ) {

  }

  setProfe(profe: profe){
      this.profe = profe
  }

  getUID(){
      return this.profe.uid
  }

  getName(){
          return this.profe.name
  }
  getLastName(){
      return this.profe.lastName
  }

  getImage(){
    return this.profe.image
  }

  getRatingMotivacion(){
    return this.profe.ratingMotivacion
  }

  getRatingProfesionalismo(){
    return this.profe.ratingProfesionalismo
  }

  getRatingPuntualidad(){
    return this.profe.ratingPuntualidad
  }

  getpromRatingMotivacion(){
    return this.profe.promRatingMotivacion
  }

  getpromRatingProfesionalismo(){
    return this.profe.promRatingProfesionalismo
  }

  getpromRatingPuntualidad(){
    return this.profe.promRatingPuntualidad
  }

  getEmail(){
      return this.profe.mail
  }
  getRole(){
      return this.profe.role
  }

  changeRole(newRol: string){

      this.db.collection('users').doc(this.profe.uid).update({
          role: newRol,
        })
      this.profe.role = newRol;
  }
}
