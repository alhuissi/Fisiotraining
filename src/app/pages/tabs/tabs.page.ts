import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authentication.service';
import { Router, RouterEvent } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(public alertController: AlertController, public authservice: AuthenticateService, private router: Router) { }

  async ngOnInit() {
    await this.authservice.getInfo();
    this.userRole = this.authservice.whatRole();
    console.log('this.authservice.whatRole(): ' + this.userRole)
    if(this.authservice.whatRole() === 'admin' ){
      this.authIsAdmin = true;
  }
    if(this.authservice.whatRole() === 'profesor' ){
      this.authIsKine = true;
  }
  if(this.authservice.whatRole() === 'cliente' ){
    this.authIsUsuario = true;
}
if(this.authservice.whatRole() === 'visita' ){
  this.authIsVisita = true;
}
if(this.authservice.whatRole() === 'cliente' || this.authservice.whatRole() === 'admin' || this.authservice.whatRole() === 'profesor'){
  this.authIsAlgo = true;
}

}

async ionViewDidEnter(){
  await this.authservice.getInfo();
    this.userRole = this.authservice.whatRole();
    console.log('this.authservice.whatRole(): ' + this.userRole)
    if(this.authservice.whatRole() === 'admin' ){
      this.authIsAdmin = true;
  }
    if(this.authservice.whatRole() === 'profesor' ){
      this.authIsKine = true;
  }
  if(this.authservice.whatRole() === 'cliente' ){
    this.authIsUsuario = true;
}
if(this.authservice.whatRole() === 'visita' ){
  this.authIsVisita = true;
}
if(this.authservice.whatRole() === 'cliente' || this.authservice.whatRole() === 'admin' || this.authservice.whatRole() === 'profesor'){
  this.authIsAlgo = true;
}
}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Función Bloqueada',
      subHeader: '',
      message: 'Debes ser miembro para acceder a esta función.',
      buttons: ['OK']
    });

    await alert.present();
  }


  escritorioTabSelected(){
   
  }

  buscarTabSelected(){

  }

  misPacientesTabSelected(){

  }

  adminTabSelected(){
    
  }

  ayudaTabSelected(){

  }

  calendarioTabSelected(){


  }

  sesionesTabSelected(){

  }

  mensajeriaTabSelected(){
    
  }
}
