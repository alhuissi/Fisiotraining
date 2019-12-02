import { Component, OnInit } from '@angular/core';
import { NotificacionService, chat } from '../../services/notificaciones.service';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { ChatComponent } from '../chat/chat.component';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.page.html',
  styleUrls: ['./mensajeria.page.scss'],
})
export class MensajeriaPage implements OnInit {

  userEmail: string;
  userID: string;
  userRole: string;
  userName: string;
  userLastName:string;

  public authIsKine: boolean = false;
  public authIsAdmin: boolean = false;
  public authIsUsuario: boolean = false;
  public authIsVisita: boolean = false;

  public chatRooms: any = [];

  constructor(private router: Router, public alertController: AlertController, public authService: AuthenticateService, private navCtrl: NavController, public chatservice: NotificacionService, private modal: ModalController, public actionSheetController: ActionSheetController) { }


  ngOnInit(){
    
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
      this.userID = this.authService.userDetails().uid;
      this.userName = this.authService.getName();
      this.userLastName = this.authService.getLastName();
      this.userRole = this.authService.getRole();

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

      this.chatservice.getChatRooms().subscribe( chats => {
      this.chatRooms = chats;
       })
    }
    else{
      this.navCtrl.navigateBack('');
    }
  }

  ionViewDidEnter(){
    this.userEmail = this.authService.userDetails().email;
      this.userID = this.authService.userDetails().uid;
      this.userName = this.authService.getName();
      this.userLastName = this.authService.getLastName();
      this.userRole = this.authService.getRole();
      
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Función Bloqueada',
      subHeader: 'Por favor solicita una sesión',
      message: 'Debes ser miembro para acceder a esta función',
      buttons: ['OK']
    });

    await alert.present();
    
  }

  logout(){
    this.authService.logoutUser().then(res => {
      console.log(res);
      this.router.navigate(['login']);
    })
    .catch(error => {
      console.log(error);
    });
  }

  openChat(chat){

   /* this.modal.create({
      component: ChatComponent,
      componentProps : {
        chat: chat
      }
    }).then( (modal) => modal.present()) */

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
      }, /*{
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          console.log('Compartir clicked');
        }
      }, */{
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
