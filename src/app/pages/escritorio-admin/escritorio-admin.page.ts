import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { EscogerUsuarioComponent } from '../escoger-usuario/escoger-usuario.component';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

import { FisiotrainingTutoComponent } from '../fisiotraining-tuto/fisiotraining-tuto.component';
import { UserService } from '../../services/user.service';
import { CurrentUserService } from '../../services/currentUser.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './escritorio-admin.page.html',
  styleUrls: ['./escritorio-admin.page.scss'],
})
export class EscritorioAdminPage implements OnInit {

  userLastName: string= '';
  userRole: string ='';
  userName: string ='';
  userEmail: string ='';
  userID: string ='';
  public authIsKine: boolean = false;
  public authIsAdmin: boolean = false;
  public authIsUsuario: boolean = false;
  public authIsVisita: boolean = false;
  private loading;
  
 
  constructor(
    private navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private modal: ModalController,
    private authService: AuthenticateService,
    private router: Router,
    private AFauth: AngularFireAuth, 
    private db: AngularFirestore,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {}
 
 async ngOnInit(){
    
    this.loadingController.create({
      message: 'Haciendo elongaciones...'
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
    });
    this.authService.getInfo();
    this.userRole = this.authService.whatRole();
    console.log('this.authservice.whatRole(): ' + this.userRole)
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

   //Buscamos usuario por la id y recuperamos el resto de los datos
    let docRef = this.db.collection("users").doc(firebase.auth().currentUser.uid);
    var stuff = []; //for names
    var stoff = []; //for lastNames
    var steff = [];  //for role

   await docRef.get().toPromise().then( doc => {
    
      if (doc.exists) {
        stuff = stuff.concat(doc.data().name);
        stoff = stoff.concat(doc.data().lastName);
        steff = steff.concat(doc.data().role);
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
      this.authService.currentUser.name = X;
      this.authService.currentUser.lastName = Y;
      this.authService.currentUser.role = Z;
      this.authService.currentUser.uid = this.authService.userDetails().uid;
  
      console.log('Usuario actual: ');
      console.log(this.authService.currentUser);
      
      this.userEmail = this.authService.userDetails().email;
      this.userID = this.authService.userDetails().uid;
      this.userName = this.authService.getName();
      this.userLastName = this.authService.getLastName();
      this.userRole = this.authService.getRole();
      this.loading.dismiss();
      
    }else{
      this.navCtrl.navigateBack('');
      this.loading.dismiss();
      
    }
    this.loading.dismiss();
  }

  ionViewDidEnter(){
    this.userEmail = this.authService.userDetails().email;
      this.userID = this.authService.userDetails().uid;
      this.userName = this.authService.getName();
      this.userLastName = this.authService.getLastName();
      this.userRole = this.authService.getRole();
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

  printID(){
    this.userEmail = this.authService.userDetails().email;
    this.userID = this.authService.userDetails().uid;

    this.userName = this.authService.getName();
    console.log('ID Escritorio: ' + this.userID);
    console.log('Name Escritorio: ' + this.userName);
    console.log('Mail Escritorio: ' + this.userEmail);
  }

openEscogerUser(){
  this.modal.create({
    component: EscogerUsuarioComponent,
    componentProps : {
     
    }
  }).then( (modal) => modal.present())

}

openFisiotrainingTuto(){
  this.modal.create({
    component: FisiotrainingTutoComponent,
    componentProps : {
     
    }
  }).then( (modal) => modal.present())

}

openVerSolicitudes(){
  this.router.navigate(['/tabs/solicitudes']);
}
  

async openSolicitarSesion(){
  return new Promise(async (resolve) => {
    const alert = await this.alertController.create({
      header: 'Escoger fecha',
      message: '<strong>Escoge la hora y el día que más te acomoden.</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Solicitud cancelada');
            return resolve(false);
          }
        }, {
          text: 'Ir al Calendario',
          handler: () => {
            this.router.navigate(['/tabs/calendario']);
            return resolve(true);
          }
        }
      ]
    });
    await alert.present();
  });
}

async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Opciones',
    buttons: [{
      text: this.userName + ' ' + this.userLastName,
      icon: 'person',
      handler: () => {
        console.log('Nombre clicked');
      }
    }, {
      text: 'Compartir',
      icon: 'share',
      handler: () => {
        console.log('Compartir clicked');
      }
    }, {
      text: 'Desconectarse',
      role: 'destructive',
      icon: 'log-out',
      handler: () => {
        this.logout();
        console.log('Delete clicked');
      }
    }, {
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();
}

}
