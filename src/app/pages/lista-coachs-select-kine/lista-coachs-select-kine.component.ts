//Selecciona Coach para asignar a la solicitud de un usuario

import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subject, Observable, combineLatest } from 'rxjs';
import { AuthenticateService } from '../../services/authentication.service';
import { Router, RouterEvent } from '@angular/router';
import { SolicitudService, solicitudFisio } from '../../services/solicitud.service';
import { UserService, user } from '../../services/user.service';

@Component({
  selector: 'app-lista-coachs-select-kine',
  templateUrl: './lista-coachs-select-kine.component.html',
  styleUrls: ['./lista-coachs-select-kine.component.scss'],
})
export class ListaCoachsSelectKineComponent implements OnInit {
  UserCollection: AngularFirestoreCollection<user>;
  ListaUsers: Observable<user[]>;

  searchterm: string;
  userName: string;
  userLastName: string;
  userEmail: string;
  userID: string;
  userRole: string;

  startAt = new Subject();
  endAt= new Subject();

  users;
  allusers;
 

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();
  selectedPath = '';

  constructor(
    private modal: ModalController,
    private navCtrl: NavController,
    private afs: AngularFirestore, 
    private router: Router,
    private solService: SolicitudService,
    private authService: AuthenticateService, 
    private userServ: UserService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
   }

  ngOnInit() {
    if(this.authService.userDetails()){
  
    }else{
      this.navCtrl.navigateBack('');
    }

      this.UserCollection = this.afs.collection('users', ref => ref.where('role', 'in', ['profesor', 'admin']));
      this.ListaUsers = this.UserCollection.valueChanges();
  }

  getallusers() {
    return this.afs.collection('users', ref => ref.orderBy('name')).valueChanges();
  }

  asignarKine(user){
    const idUser = this.solService.getSolicitudUserID();
    this.afs.collection('users').doc(idUser).update({
      kineID: user.uid,
      kine: user.name.concat(' ').concat(user.lastName),
      role: 'cliente',
    });
    console.log('Coach asignado: ' + user.name + ' ' + user.lastName + ', ID: ' + user.uid + ', IDPaciente: ' + idUser);
    this.modal.dismiss();

  }

  

  closeComponent(){
    this.modal.dismiss();
  }
}
