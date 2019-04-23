import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subject, Observable, combineLatest } from 'rxjs';
import { AuthenticateService } from '../../services/authentication.service';
import { Router, RouterEvent } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ModalController } from '@ionic/angular';
import { EvaluacionDiariaService, evaluacionDiaria } from '../../services/evaluacion-diaria.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-ver-evaluaciones',
  templateUrl: './ver-evaluaciones.page.html',
  styleUrls: ['./ver-evaluaciones.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style ({opacity:0}),
        animate('200ms ease-in', style({ opacity: 1}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({opacity: 0}))
      ])
    ])
  ]
})
export class VerEvaluacionesPage implements OnInit {

  searchterm: string;

  startAt = new Subject();
  endAt= new Subject();

  evaDiCollection: AngularFirestoreCollection<evaluacionDiaria>;
  evas: Observable<evaluacionDiaria[]>;

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();
  selectedPath = '';

  userName: string;
  userLastName: string;
  userEmail: string;
  userID: string;
  userRole: string;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router,
    private userServ: UserService,
    private evaDiariaServ: EvaluacionDiariaService,
    private afs: AngularFirestore,
    public modalController: ModalController
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
   }

  ngOnInit() {   

    if(this.authService.userDetails()){
      this.userID = this.userServ.getUID();
      this.userLastName = this.userServ.getLastName();
      this.userEmail = this.userServ.getEmail();
      this.userName = this.userServ.getName();
      this.userRole = this.userServ.getRole();

      
    }else{
      this.navCtrl.navigateBack('');
    }

    /*Asocia a evas solamente los docs que tienen el mismo userID*/
      this.evaDiCollection = this.afs.collection('evaluacion-diaria', ref => {
        return ref.where('userid', '==', this.userID)
      });
      this.evas = this.evaDiCollection.valueChanges();
  }

  ionViewDidEnter(){
    this.userID = this.userServ.getUID();
    this.userEmail = this.userServ.getEmail();
    this.userLastName = this.userServ.getLastName();
    this.userName = this.userServ.getName();
    this.userRole = this.userServ.getRole();
    this.evaDiCollection = this.afs.collection('evaluacion-diaria', ref => {
      return ref.where('userid', '==', this.userID)
    });
    this.evas = this.evaDiCollection.valueChanges();
  }


  goBack(){
    this.navCtrl.navigateBack('/tabs/perfil');
  }

  search($event){
    let q = $event.target.value;
    this.startAt.next(q);
    this.endAt.next(q + "\uf8ff")
  }

  firequery(start, end){
    return this.afs.collection('evaluacion-diaria', ref => ref.limit(20).orderBy('fecha').startAt(start).endAt(end)).valueChanges();
  }

  async openEvaluacion(evaluacion){
    this.evaDiariaServ.setEvaluacion(evaluacion);
    //console.log('ID: ', evaluacion.formid);
    //console.log('Evaluación: ', evaluacion);
    //this.userServ.setUser(this.afs.collection('users').doc(uid));
    this.router.navigate(['/tabs/abrir-evaluacion-diaria']);
  }
  
}
