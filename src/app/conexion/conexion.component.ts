import { Component, OnInit, Input } from '@angular/core';
import * as globalVar from '../services/global';
import { SocketService  } from '../services/socket.service';

@Component({
  selector: 'app-conexion',
  templateUrl: './conexion.component.html',
  styleUrls: ['./conexion.component.less']
})

export class ConexionComponent implements OnInit {
  socket: any;
  messages = new Array();
  messageText: any = 'hola';
  output: any;

  constructor(private socketService: SocketService) {
  }

  ngOnInit() {
  }

  submit(path: string, name: string, nickname: string) {

    this.socketService.connect(path, name, nickname);

    this.socketService.on('updateSocketList', (data: any) => {
      console.log(data);
    });

    this.socketService.on('message-received', (msg: any) => {
      console.log('recibiendo los mensajes');
      this.messages.push(msg);
      console.log(msg);
      console.log(this.messages);
      this.output += `<div id='container'><p>${msg.text}</p><span id='time-left'>${msg.date}</span></div>`;
    });

  }

  sendMessage () {
    console.log('enviamdo mensaje' + this.messageText);
    const message = {
      text: this.messageText ,
      date: Date.now()
    };

    this.socketService.emit('send-message', message);
    this.messageText = '';
  }

}
