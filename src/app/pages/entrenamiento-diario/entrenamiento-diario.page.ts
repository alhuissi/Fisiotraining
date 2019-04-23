import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { trigger, transition, animate, style } from '@angular/animations';
import { AlertController } from '@ionic/angular';
import { Timestamp } from 'firebase-firestore-timestamp';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-entrenamiento-diario',
  templateUrl: './entrenamiento-diario.page.html',
  styleUrls: ['./entrenamiento-diario.page.scss'],
})
export class EntrenamientoDiarioPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private router: Router,
    private userServ: UserService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.navigateBack('/tabs/sesion-fisiotraining');
  }

}
