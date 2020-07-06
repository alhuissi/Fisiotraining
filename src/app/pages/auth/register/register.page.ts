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
  public birth: any;
  public direccion: string;
  loading;


  constructor(public fb: FormBuilder, public loadingCtrl: LoadingController, public alertController: AlertController,
    private router: Router,
    private navCtrl: NavController,
    private authService: AuthenticateService,
    public loadingController: LoadingController

  ) {

    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.registerForm = fb.group({
      profileName: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      profileLastName: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      phone: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      birth: new Date,
      direccion: ['', Validators.compose([Validators.minLength(2), Validators.required])],
    });
  }

  ngOnInit() {
  }
  

  async tryRegister() {

    this.loadingController.create({
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
    });
    if (!this.registerForm.valid) {
      console.log(this.registerForm.value);
      console.log("invalid form");
      this.loading.dismiss();
    } else {

      this.authService.registerUser(
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.phone,
        this.registerForm.value.profileName,
        this.registerForm.value.profileLastName,
        this.registerForm.value.birth,
        this.registerForm.value.direccion)
        .then(() => {
          this.loading.dismiss();
          this.presentAlert2();
          this.authService.isLogged == true;
          this.router.navigate(['']);
          
        }, (error) => {
          this.loading.dismiss();
          console.log(error);
          this.presentAlert(error);
        });
    }
  }

  goForgotPage() {
    this.router.navigate(['forgot']);
  }

  goLoginPage() {
    console.log(this.registerForm.value.birth);
    this.navCtrl.navigateBack('');
  }

  async presentAlert(error: string) {
    const alert = await this.alertController.create({
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentAlert2() {
    const alert = await this.alertController.create({
      message: 'Te has registrado con éxito',
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