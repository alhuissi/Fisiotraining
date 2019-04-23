import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Subject, Observable, combineLatest } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { SolicitudService, solicitudFisio } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {



  SolicitudesCollection: AngularFirestoreCollection<solicitudFisio>;
  solicitudes: Observable<solicitudFisio[]>;

  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private afs: AngularFirestore,
    private userServ: UserService,
    private solicitud: SolicitudService,
    private alertController: AlertController,
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
    this.navCtrl.navigateBack('/tabs/escritorio-admin');
  }

openSolicitud(solicitud: SolicitudService){

}

}
