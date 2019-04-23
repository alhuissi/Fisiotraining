import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fisiotraining-tuto',
  templateUrl: './fisiotraining-tuto.component.html',
  styleUrls: ['./fisiotraining-tuto.component.scss'],
})
export class FisiotrainingTutoComponent implements OnInit {

  constructor(
    private modal: ModalController,
  ) { }

  ngOnInit() {}

  closeComponent(){
    this.modal.dismiss();
  }

}
