import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Observable, combineLatest } from 'rxjs';
import { Router, RouterEvent } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthenticateService } from '../../services/authentication.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { setDefaultService } from 'selenium-webdriver/chrome';

@Component({
  selector: 'app-escoger-usuario',
  templateUrl: './escoger-usuario.component.html',
  styleUrls: ['./escoger-usuario.component.scss'],
})
export class EscogerUsuarioComponent implements OnInit {

  searchterm: string;

  startAt = new Subject();
  endAt= new Subject();

  users;
  allusers;

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  selectedPath = '';

  constructor(
    private modal: ModalController,
    private afs: AngularFirestore, 
    private router: Router, 
    private userServ: UserService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
   }

   ngOnInit() {
    combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((users) => {
        
        this.users = users;
      })
    })
  }

  search($event){
    let q = $event.target.value.toLowerCase();   //para evitar problemas con mayúsculas
    if (q != '') {
    this.startAt.next(q);
    this.endAt.next(q + "\uf8ff")
    }else{
      this.users = this.allusers;
    }
  }

  firequery(start, end){
    return this.afs.collection('users', ref => ref.limit(5).orderBy('mail').startAt(start).endAt(end)).valueChanges();
  }

  getallusers() {
    return this.afs.collection('users', ref => ref.orderBy('name')).valueChanges();
  }


  openProfile(user){
    this.userServ.setUser(user);
    //this.userServ.setUser(this.afs.collection('users').doc(uid));
    this.modal.dismiss();
    this.router.navigate(['/tabs/perfil']);
  }


  closeComponent(){
    this.modal.dismiss();
  }
}
