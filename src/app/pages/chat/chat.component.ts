import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { message } from '../../models/message';
import { ChatsService } from "../../services/chats.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  public chat : any;
  //public message : message;
  public messages = [];
  public msg : string;

  public room: any;

  constructor(private navParams: NavParams, private modal: ModalController, private chatService : ChatsService) { }

  ngOnInit() {
    
    this.chatService.getChatRoom(this.chat.id).subscribe( room => {
      console.log(room);
      this.room = room;
    })
    this.chat = this.navParams.get('chat')
  }

  closeChat(){
    this.modal.dismiss();
  }

  sendMessage(){
    const mensaje : message = {
      content : this.msg,
      type: 'test',
      date: new Date()
    }
    this.chatService.sendMsgToFirebase(mensaje, this.chat.id);
    this.msg = "";
  }
}
