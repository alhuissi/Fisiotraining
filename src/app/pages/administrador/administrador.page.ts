import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ChatsService, chat } from '../../services/chats.service';
import { ChatComponent } from '../chat/chat.component';
import { EscogerUsuarioComponent } from '../escoger-usuario/escoger-usuario.component';
import { ListaUsuariosComponent } from '../lista-usuarios/lista-usuarios.component';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

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
  public chatRooms: any = [];

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    public actionSheetController: ActionSheetController,
    public chatservice: ChatsService, 
    private modal: ModalController,
    private router: Router,
    ) { }

  ngOnInit() {
    this.authService.getInfo();
    this.userRole = this.authService.whatRole();
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
  }
  else{
    this.navCtrl.navigateBack('');
  }
  this.chatservice.getChatRooms().subscribe( chats => {
    this.chatRooms = chats;
     })
     
}

  ionViewDidEnter(){
    this.userEmail = this.authService.userDetails().email;
      this.userID = this.authService.userDetails().uid;
      this.userName = this.authService.getName();
      this.userLastName = this.authService.getLastName();
      this.userRole = this.authService.getRole();
  }

  openEscogerUser(){
    this.modal.create({
      component: EscogerUsuarioComponent,
      componentProps : {
       
      }
    }).then( (modal) => modal.present())
  
  }

 openListaUsers(){
  this.router.navigate(['/tabs/ver-listas-usuarios']);
   /*
    this.modal.create({
      component: ListaUsuariosComponent,
      componentProps : {
       
      }
    }).then( (modal) => modal.present())
    */
  }

  openVerSolicitudes(){
    this.router.navigate(['/tabs/solicitudes']);
  }


  openChat(chat){

    this.modal.create({
      component: ChatComponent,
      componentProps : {
        chat: chat
      }
    }).then( (modal) => modal.present())

  }

  openEnviarNotificacion(){
    
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
      }, */ {
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
