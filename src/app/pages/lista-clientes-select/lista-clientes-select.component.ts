import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subject, Observable, combineLatest } from 'rxjs';
import { AuthenticateService } from '../../services/authentication.service';
import { Router, RouterEvent } from '@angular/router';
import { UserService, user } from '../../services/user.service';

@Component({
  selector: 'app-lista-clientes-select',
  templateUrl: './lista-clientes-select.component.html',
  styleUrls: ['./lista-clientes-select.component.scss'],
})
export class ListaClientesSelectComponent implements OnInit {

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

    this.UserCollection = this.afs.collection('users', ref => ref.where('role', '==', 'cliente'))
      this.ListaUsers = this.UserCollection.valueChanges();
  }

  getallusers() {
    return this.afs.collection('users', ref => ref.orderBy('name')).valueChanges();
  }

  openProfile(user){
    this.userServ.setUser(user);
    //this.userServ.setUser(this.afs.collection('users').doc(uid));
    this.modal.dismiss();
  }

  closeComponent(){
    this.modal.dismiss();
  }

}
