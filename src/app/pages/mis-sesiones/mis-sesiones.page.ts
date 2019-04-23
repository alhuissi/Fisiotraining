import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../../services/authentication.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-mis-sesiones',
  templateUrl: './mis-sesiones.page.html',
  styleUrls: ['./mis-sesiones.page.scss'],
})
export class MisSesionesPage implements OnInit {

  userEmail: string;
  userID: string;
  userRole: string;
  userName: string;
  userLastName:string;

  public authIsKine: boolean = false;
  public authIsAdmin: boolean = false;
  public authIsUsuario: boolean = false;
  public authIsVisita: boolean = false;

  constructor(
    private router: Router,
    public authService: AuthenticateService,
    private navCtrl: NavController,
    private modal: ModalController, 
    public actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {
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
      this.userEmail = this.authService.userDetails().email;
      this.userID = this.authService.userDetails().uid;
      this.userName = this.authService.getName();
      this.userLastName = this.authService.getLastName();
      this.userRole = this.authService.getRole();

    }else{
      this.navCtrl.navigateBack('');
    }
  }

  openMensajes(){
    this.router.navigate(['/tabs/mensajeria']);
  }

  logout(){
    this.authService.logoutUser().then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
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
