import { Component, OnInit, Input } from '@angular/core';
import * as globalVar from '../services/global';
import { SocketService  } from '../services/socket.service';
@Component({
  selector: 'app-conexion',
  templateUrl: './conexion.component.html',
  styleUrls: ['./conexion.component.less']
})
export class ConexionComponent implements OnInit {
  nickname: string = null;
  username: string = null;
  path: string;
  socket: any;
  messages = new Array();
  messageText: any = 'hola';
  constructor(private socketService: SocketService) {
  }

  ngOnInit() {
    this.socketService.on('message-received', (msg: any) => {
      this.messages.push(msg);
      console.log(msg);
      console.log(this.messages);
    });
  }

  submit(path: string, name: string, nickname: string) {
    this.username = name;
    this.nickname = nickname;
    this.path = path;
    this.socketService.connect(this.path, this.username, this.nickname);
    this.socketService.on('updateSocketList', (data: any) => {
      console.log(data);
    });
  }

  sendMessage() {
    console.log('enviamdo mensaje' + this.messageText);
    const message = {
      text: this.messageText ,
      date: Date.now()
    };
    this.socketService.emit('send-message', message);
    this.messageText = '';
  }
}
