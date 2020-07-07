import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Observable, combineLatest } from 'rxjs';
import { Router, RouterEvent } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthenticateService } from '../../services/authentication.service';
import { NavController, ActionSheetController } from '@ionic/angular';



@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.page.html',
  styleUrls: ['./buscar-usuario.page.scss'],
})
export class BuscarUsuarioPage implements OnInit {

  searchterm: string;
  
  userEmail: string;
  userID: string;
  userRole: string;
  userName: string;
  userLastName:string;

  public authIsKine: boolean = false;
  public authIsAdmin: boolean = false;
  public authIsUsuario: boolean = false;
  public authIsVisita: boolean = false;

  startAt = new Subject();
  endAt= new Subject();

  users;
  allusers;

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  selectedPath = '';

  constructor(public authService: AuthenticateService, public actionSheetController: ActionSheetController, private navCtrl: NavController, private afs: AngularFirestore, private router: Router, private userServ: UserService) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
   }

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

      
    combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((users) => {
        
        this.users = users;
      })
    })

    }else{
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

  search($event){
    let q = $event.target.value.toLowerCase();   //para evitar problemas con mayúsculas
    if (q != '') {
    this.startAt.next(q);
    this.endAt.next(q + "\uf8ff")
    }else{
      this.users = this.allusers;
    }
  }

  firequery(start, end){
    return this.afs.collection('users', ref => ref.limit(5).orderBy('mail').startAt(start).endAt(end)).valueChanges();
  }

  getallusers() {
    return this.afs.collection('users', ref => ref.orderBy('name')).valueChanges();
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

  openProfile(user){
    this.userServ.setUser(user);
    //this.userServ.setUser(this.afs.collection('users').doc(uid));
    this.router.navigate(['/tabs/perfil']);
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
