import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../../../services/authentication.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  public forgotForm;
  public email: string;
  public password: string;
  public name: string;
  public lastName: string;
  loading;

  constructor(
    public fb: FormBuilder,
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthenticateService,
    public alertController: AlertController,
    public loadingController: LoadingController
    ) {
      let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.forgotForm = fb.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])]
      });
   }

  ngOnInit() {
  }

  recuperarContrasena(){
    this.loadingController.create({
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
    });
    if (!this.forgotForm.valid) {
      console.log(this.forgotForm.value);
      console.log("invalid form");
      this.loading.dismiss();
    } else {

      this.authService.resetPassword(
        this.forgotForm.value.email)
        .then(() => {
          this.presentAlert2();
          this.loading.dismiss();
        }, (error) => {
          this.loading.dismiss();
          console.log(error);
          this.presentAlert(error);
        });
    }

  }

  goLoginPage() {
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
      message: 'Email enviado',
      buttons: ['OK']
    });

    await alert.present();
  }

}
