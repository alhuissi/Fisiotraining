import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { ListaUsuariosComponent } from '../lista-usuarios/lista-usuarios.component';
import { ListaClientesComponent } from '../lista-clientes/lista-clientes.component';
import { ListaCoachsComponent } from '../lista-coachs/lista-coachs.component';
import { ListaAdminsComponent } from '../lista-admins/lista-admins.component';
import { ListaVisitaComponent } from '../lista-visita/lista-visita.component';
import { AuthenticateService } from '../../services/authentication.service';


@Component({
  selector: 'app-ver-listas-usuarios',
  templateUrl: './ver-listas-usuarios.page.html',
  styleUrls: ['./ver-listas-usuarios.page.scss'],
})
export class VerListasUsuariosPage implements OnInit {

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
    private modal: ModalController,
    private authService: AuthenticateService,
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
  }

  ionViewDidEnter(){
    this.userEmail = this.authService.userDetails().email;
      this.userID = this.authService.userDetails().uid;
      this.userName = this.authService.getName();
      this.userLastName = this.authService.getLastName();
      this.userRole = this.authService.getRole();
  }

  goBack(){
    this.navCtrl.navigateBack('/tabs/administrador');
  }

  openListaUsers(){
    this.modal.create({
      component: ListaUsuariosComponent,
      componentProps : {
       
      }
    }).then( (modal) => modal.present())
  }

  openListaAdmins(){
    this.modal.create({
      component: ListaAdminsComponent,
      componentProps : {
       
      }
    }).then( (modal) => modal.present())  
  }

  openListaCoachs(){
    this.modal.create({
      component: ListaCoachsComponent,
      componentProps : {
       
      }
    }).then( (modal) => modal.present())  
  }

  openListaPacientes(){
    this.modal.create({
      component: ListaClientesComponent,
      componentProps : {
       
      }
    }).then( (modal) => modal.present()) 

  }

  openListaVisitas(){
    this.modal.create({
      component: ListaVisitaComponent,
      componentProps : {
       
      }
    }).then( (modal) => modal.present())
  }


}
