import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authentication.service';
import { Router, RouterEvent } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../services/user.service';




@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  username = '';
  userRole = '';

  public authIsKine: boolean = false;
  public authIsAdmin: boolean = false;
  public authIsUsuario: boolean = false;
  public authIsVisita: boolean = false;
  public authIsAlgo: boolean = false;

  constructor(
    public alertController: AlertController,
    public authservice: AuthenticateService,
    private router: Router,
    public userServ: UserService) { }

  async ngOnInit() {
    await this.authservice.getInfo();
    this.userRole = this.authservice.whatRole();
    if (this.authservice.whatRole() === 'admin') {
      this.authIsAdmin = true;
      this.authIsKine = false;
      this.authIsUsuario = false;
      this.authIsVisita = false;
    }
    if (this.authservice.whatRole() === 'profesor') {
      this.authIsKine = true;
      this.authIsAdmin = false;
      this.authIsUsuario = false;
      this.authIsVisita = false;
    }
    if (this.authservice.whatRole() === 'cliente') {
      this.authIsUsuario = true;
      this.authIsAdmin = false;
      this.authIsKine = false;
      this.authIsVisita = false;
    }
    if (this.authservice.whatRole() === 'visita') {
      this.authIsVisita = true;
      this.authIsAdmin = false;
      this.authIsKine = false;
      this.authIsUsuario = false;
    }
    if (this.authservice.whatRole() === 'cliente' || this.authservice.whatRole() === 'admin' || this.authservice.whatRole() === 'profesor') {
      this.authIsAlgo = true;
    }

  }

  async ionViewDidEnter() {
    await this.authservice.getInfo();
    this.userRole = this.authservice.whatRole();
    if (this.authservice.whatRole() === 'admin') {
      this.authIsAdmin = true;
      this.authIsKine = false;
      this.authIsUsuario = false;
      this.authIsVisita = false;
    }
    if (this.authservice.whatRole() === 'profesor') {
      this.authIsKine = true;
      this.authIsAdmin = false;
      this.authIsUsuario = false;
      this.authIsVisita = false;
    }
    if (this.authservice.whatRole() === 'cliente') {
      this.authIsUsuario = true;
      this.authIsAdmin = false;
      this.authIsKine = false;
      this.authIsVisita = false;
    }
    if (this.authservice.whatRole() === 'visita') {
      this.authIsVisita = true;
      this.authIsAdmin = false;
      this.authIsKine = false;
      this.authIsUsuario = false;
    }
    if (this.authservice.whatRole() === 'cliente' || this.authservice.whatRole() === 'admin' || this.authservice.whatRole() === 'profesor') {
      this.authIsAlgo = true;
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Calendario Bloqueada',
      subHeader: '',
      message: 'Debes suscribirte para acceder a esta función.',
      buttons: ['OK']
    });

    await alert.present();
  }

  registrate(){
    this.presentAlert();
  }


  escritorioTabSelected() {

  }

  buscarTabSelected() {

  }

  misPacientesTabSelected() {

  }

  adminTabSelected() {

  }

  ayudaTabSelected() {

  }

  calendarioTabSelected() {


  }

  sesionesTabSelected() {

  }

  mensajeriaTabSelected() {

  }

  perfilTabSelected() {
    this.userServ.setUser(this.authservice.currentUser);
  }

  perfilKineTabSelected() {
    this.userServ.setUser(this.authservice.currentUser);
  }
}
