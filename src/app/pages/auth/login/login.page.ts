import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { AuthenticateService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: any;
  email: string;
  password: string;
  private loading;
 
  constructor(
 
    private navCtrl: NavController,
    public router: Router,
    private authService: AuthenticateService,
    public alertController: AlertController,
    public fb: FormBuilder, 
    public alertCtrl: AlertController, 
    public loadingController: LoadingController,
 
  ) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.loginForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
   }
 
  ngOnInit() {
 
  }
 

 z
 
async loginUser(){

  
      if (!this.loginForm.valid){

          console.log("error");
          alert('Los datos son incorrectos o no existe el usuario');
      } else {
        // this.presentLoadingWithOptions();
        this.loadingController.create({
          message: 'Verificando datos...',
          duration: 2000,
        }).then((overlay) => {
          this.loading = overlay;
          this.loading.present();
        });

       await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then( authData => {
          console.log("Authentification completed");
         this.authService.getInfo(); 
         this.loading.dismiss();
         if(this.authService.whatRole() === 'admin') {
          this.router.navigate(['/tabs/escritorio-admin']);
         }
         if(this.authService.whatRole() === 'profesor') {
          this.router.navigate(['/tabs/escritorio-profesor']);
         }
         if(this.authService.whatRole() === 'cliente') {
          this.router.navigate(['/tabs/escritorio-cliente']);
         }
         if(this.authService.whatRole() === 'visita') {
          this.router.navigate(['/tabs/escritorio-visita']);
         }
          
          this.loading.dismiss();
        }, error => {
          var errorMessage: string = error.message;
          this.loading.dismiss();
          console.log(errorMessage)
          this.presentAlert(errorMessage);
        });
      }
  }
  
 
  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }

  
  async presentAlert(error: string) {
    const alert = await this.alertController.create({
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: "crescent",
      duration: 1000,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
 
}
