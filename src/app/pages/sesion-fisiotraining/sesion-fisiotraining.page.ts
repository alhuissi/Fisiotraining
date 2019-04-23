import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VerUltimaEvaluacionComponent } from '../ver-ultima-evaluacion/ver-ultima-evaluacion.component';
import { trigger, transition, animate, style } from '@angular/animations';
import { AlertController } from '@ionic/angular';
import { Timestamp } from 'firebase-firestore-timestamp';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EvaluacionDiariaService, evaluacionDiaria } from '../../services/evaluacion-diaria.service';

@Component({
  selector: 'app-sesion-fisiotraining',
  templateUrl: './sesion-fisiotraining.page.html',
  styleUrls: ['./sesion-fisiotraining.page.scss'],
})
export class SesionFisiotrainingPage implements OnInit {

  userName: string;
  userLastName: string;
  userEmail: string;
  userID: string;
  userRole: string;
  authRole: string;
  ultimaEva: evaluacionDiaria;

  fechaToday;

  public authIsAdmin: boolean = false;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router,
    private modal: ModalController,
    private evaDiariaServ: EvaluacionDiariaService,
    private userServ: UserService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    if(this.authService.userDetails()){

      this.ultimaEva = this.evaDiariaServ.getEvaluacion();
      this.openVerUltimaEvaluacion(); //abre última sesión en un componente

      this.userID = this.userServ.getUID();
      this.userEmail = this.userServ.getEmail();
      this.userName = this.userServ.getName();
      this.userLastName = this.userServ.getLastName();
      this.userRole = this.userServ.getRole();
      this.authRole = this.authService.whatRole();
      this.fechaToday = Date.now();
    }else{
      this.navCtrl.navigateBack('');
    }

    if(this.authService.whatRole() === 'admin'){
        this.authIsAdmin = true;
    }

  }

  ionViewDidEnter(){
    if(this.authService.userDetails()){

      this.ultimaEva = this.evaDiariaServ.getEvaluacion();
     

      this.userID = this.userServ.getUID();
      this.userEmail = this.userServ.getEmail();
      this.userName = this.userServ.getName();
      this.userLastName = this.userServ.getLastName();
      this.userRole = this.userServ.getRole();
      this.authRole = this.authService.whatRole();
      this.fechaToday = Date.now();
    }else{
      this.navCtrl.navigateBack('');
    }

    if(this.authService.whatRole() === 'admin'){
        this.authIsAdmin = true;
    }

  }

  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }

  goBack(){
    this.navCtrl.navigateBack('/tabs/perfil');
  }

  openHacerEvaluacionDiariaPage(){
    this.router.navigate(['/tabs/hacer-evaluacion-diaria']);
  }

  openHacerEntrenamientoDiarioPage(){
    this.router.navigate(['/tabs/entrenamiento-diario']);
  }

  openHacerEvaluacionBimensualPage(){
    this.router.navigate(['/tabs/hacer-evaluacion-bimensual']);
  }

  openVerEvaluacionesPage(){
    this.router.navigate(['/tabs/ver-evaluaciones']);
  }

  async openVerUltimaEvaluacion(){
    
    this.modal.create({
      component: VerUltimaEvaluacionComponent,
      componentProps : {
       
      }
    }).then( (modal) => modal.present())
  
  }
}
