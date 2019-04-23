import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../../../services/authentication.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 
  public registerForm;
  public email: string;
  public password: string;
  public name: string;
  public lastName: string;
  loading;

 
  constructor(public fb: FormBuilder, public loadingCtrl: LoadingController, public alertController: AlertController,
    private router : Router,
    private navCtrl: NavController,
    private authService: AuthenticateService,
    public loadingController: LoadingController

  ) {

    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      
      this.registerForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
            profileName: ['', Validators.compose([Validators.minLength(2), Validators.required])],
            profileLastName: ['', Validators.compose([Validators.minLength(2), Validators.required])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      });
  }
 
  ngOnInit(){
  }
 
  async tryRegister(){


    this.loadingController.create({
      message: 'Verificando datos...'
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
    });
      if (!this.registerForm.valid){
        console.log(this.registerForm.value);
        console.log("invalid form");
      } else {
 
        this.authService.registerUser(
            this.registerForm.value.email, 
            this.registerForm.value.password,
            this.registerForm.value.profileName, 
            this.registerForm.value.profileLastName)
        .then(() => {
          this.router.navigate(['/tabs/escritorio-admin']);
          this.loading.dismiss();
        }, (error) => { 
          this.loading.dismiss();
          console.log(error);
          this.presentAlert(error);
        });
  
      }

  }
  
  

  goLoginPage(){
    this.navCtrl.navigateBack('');
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