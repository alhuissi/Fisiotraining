import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core'; 
import { UserService, user } from '../../services/user.service';
import { Subject, Observable, combineLatest } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { SolicitudService, solicitudFisio } from 'src/app/services/solicitud.service';
import { ListaClientesSelectComponent } from '../lista-clientes-select/lista-clientes-select.component';
import { ListaCoachsSelectKineComponent } from '../lista-coachs-select-kine/lista-coachs-select-kine.component';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {

  sol: solicitudFisio;

  kineSelected: string;
  kineSelectedLastName: string;
  kineIDSelected: string;

  SolicitudesCollection: AngularFirestoreCollection<solicitudFisio>;
  solicitudes: Observable<solicitudFisio[]>;

  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private afs: AngularFirestore,
    private userServ: UserService,
    private modal: ModalController,
    private solicitud: SolicitudService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {

    if(this.authService.userDetails()){

      
    }else{
      this.navCtrl.navigateBack('');
    }

      this.SolicitudesCollection = this.afs.collection('solicitudes');
      this.solicitudes = this.SolicitudesCollection.valueChanges();
  }

  ionViewDidEnter(){
    if(this.authService.userDetails()){

      
    }else{
      this.navCtrl.navigateBack('');
    }

      this.SolicitudesCollection = this.afs.collection('solicitudes');
      this.solicitudes = this.SolicitudesCollection.valueChanges();

  }

  goBack(){
    this.navCtrl.navigateBack('/tabs/administrador');
  }

async openSolicitud(solicitud){
  this.solicitud.setSolicitud(solicitud);
  const idsol = this.solicitud.getIDSol();
  const confirmation = await this.presentAlertConfirm();
  if (confirmation){
        this.afs.collection("solicitudes").doc(idsol).delete().then(function() {
          console.log("Document successfully deleted!");
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
        
        console.log('Solicitud Eliminada: '+ this.solicitud);
    }
     else {
        console.log('Error.');
        return; 
     }
}

async presentAlertConfirm() {
  return new Promise(async (resolve) => {
  const alert = await this.alertCtrl.create({
    header: '¿Aceptar Solicitud?',
    message: '',
    buttons: [
      {
        text: 'Eliminar',
        handler: () => {
          console.log('Eliminando Solicitud...');
          return resolve(true);
        }
      },
      {
        text: 'Aún no',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          
          return resolve(false);
        }
      }, {
        text: 'Sí, Asignar Coach',
        handler: () => {
          
          this.openEscogerKine();
          console.log('Asignando Coach...');
          return resolve(true);
        }
      }
    ]
  });

  await alert.present();
});
}

async openEscogerKine(){
  const modalEscoger: HTMLIonModalElement = await this.modal.create({
  component: ListaCoachsSelectKineComponent,
  componentProps : {
   
  }
  })

  /*
  modalEscoger.onDidDismiss().then((detail: OverlayEventDetail) => {
  if (detail !== null) {
    console.log('Entrenador seleccionado: ', this.userServ.getName());
    this.kineSelected = this.userServ.getName();
    this.kineSelectedLastName = this.userServ.getLastName();
    this.kineIDSelected = this.userServ.getUID();
  }
  });
  */

  await modalEscoger.present();

}


}
