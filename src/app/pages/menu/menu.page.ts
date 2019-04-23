import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authentication.service';
import { Router, RouterEvent } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  username = '';
  userRole = '';
  pages = [
    {
      title: 'First Page',
      url: '/menu/first'
    },
    {
      title: 'Second Page',
      url: '/menu/second'
    },
    {
      title: 'Escritorio Admin',
      url: '/menu/escritorio-admin'
    },
    {
      title: 'Ver Mensajes',
      url: '/menu/mensajeria'
    }
  ]

  selectedPath = '';

  constructor(public authservice: AuthenticateService, private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
   }

  async ngOnInit() {
    await this.authservice.getInfo();
    this.userRole = this.authservice.whatRole();
    console.log('this.authservice.whatRole(): ' + this.userRole)
    if (this.userRole === 'admin'){
      this.pages = [
        {title: 'Panel', url: '/menu/escritorio-admin'},
       // {title: 'First', url: '/menu/first'},
        {title: 'Administracion de Tienda', url: '/menu/second'},
        {title: 'Estadísticas Globales App', url: '/menu/second'},
        {title: 'Solicitudes', url: '/menu/second'},
        {title: 'Calendario', url: '/menu/second'},
        {title: 'Buscar Usuario', url: '/menu/buscar-usuario'},
        {title: 'Mis Mensajes (BETA)', url: '/menu/mensajeria'},
        {title: 'Mis Sesiones', url: '/menu/second'},
        {title: 'Tienda', url: '/menu/second'}
      ];
    } 
    else if(this.userRole ==='profesor'){
      this.pages = [
        {title: 'Panel', url: '/menu/escritorio-admin'},
      //  {title: 'First', url: '/menu/first'},
        {title: 'Calendario', url: '/menu/second'},
        {title: 'Buscar Usuario', url: '/menu/buscar-usuario'},
        {title: 'Mis Mensajes (BETA)', url: '/menu/mensajeria'},
        {title: 'Mis Sesiones', url: '/menu/second'},
        {title: 'Tienda',  url: '/menu/second'}
      ];
    }
    else if(this.userRole ==='cliente'){
      this.pages = [
        {title: 'Panel', url: '/menu/escritorio-admin'},
      //  {title: 'First', url: '/menu/first'},
        {title: 'Mis Sesiones', url: '/menu/second'},
        {title: 'Calendario', url: '/menu/second'},
        {title: 'Solicitar Sesión', url: '/menu/second'},
        {title: 'Mis Mensajes (BETA)', url: '/menu/mensajeria'},
        {title: 'Tienda', url: '/menu/second'}
      ];
    }
    else{
      this.pages = [
        {title: 'Panel', url: '/menu/escritorio-admin'},
        {title: '¿En qúe consiste FisioTraining?', url: '/menu/second'},
        {title: 'Solicitar Sesión', url: '/menu/second'},
        {title: 'Tienda', url: '/menu/second'}
      ];
    }
    this.username = this.authservice.currentUser.mail;
  }

  logout(){
    this.authservice.logoutUser();
  }
  

async ionViewWillEnter() {
    
 
  }


}
