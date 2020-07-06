import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authentication.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject, Observable, combineLatest } from 'rxjs';
import { UserService } from '../../services/user.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { trigger, transition, animate, style } from '@angular/animations';
import { ActionSheetController } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EvaluacionDiariaService, evaluacionDiaria } from '../../services/evaluacion-diaria.service';
import { Timestamp } from 'firebase-firestore-timestamp';


@Component({
  selector: 'app-perfil-stats',
  templateUrl: './perfil-stats.page.html',
  styleUrls: ['./perfil-stats.page.scss'],
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
export class PerfilStatsPage implements OnInit {

  userName: string;
  userLastName: string;
  userEmail: string;
  userID: string;
  userRole: string;
  authRole: string;

  fechaToday;

  public authIsKine: boolean = false;
  public authIsAdmin: boolean = false;
  public authIsUsuario: boolean = false;
  public authIsVisita: boolean = false;

  private loading;


  constructor(
    public actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    private evaDiServ: EvaluacionDiariaService,
    private authService: AuthenticateService,
    private router: Router,
    private afs: AngularFirestore,
    private userServ: UserService,
    private alertController: AlertController,
    public loadingController: LoadingController,
  ) { }

  async ngOnInit() {
    this.fechaToday = Date.now();
    if(this.authService.userDetails()){
      if(this.authService.whatRole() === 'admin' ){
        this.authIsAdmin = true;
       }
      if(this.authService.whatRole() === 'admin' || this.authService.whatRole() === 'profesor' ){
        
        this.authIsKine = true;
       }
      if(this.authService.whatRole() === 'cliente' ){
        this.authIsUsuario = true;
      }
      if(this.authService.whatRole() === 'visita' ){
        this.authIsVisita = true;
       }

    }else{
      this.navCtrl.navigateBack('');
    }
  }

  goBack(){
    this.navCtrl.navigateBack('/tabs/escritorio-admin');
  }

  async ionViewWillEnter(){

  }

}
