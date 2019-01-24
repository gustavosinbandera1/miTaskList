import { Component, OnInit, Input } from '@angular/core';

import { SocketService  } from '../services/socket.service';

@Component({
  selector: 'app-conexion',
  templateUrl: './conexion.component.html',
  styleUrls: ['./conexion.component.less']
})

export class ConexionComponent implements OnInit {
 // socket: any;
  messages = new Array();
  messageText: any = 'hola';
  output: any;
  email = '';
  data = {};
  constructor(private socket: SocketService) {
  }

  ngOnInit() {
  }

  submit(path: string, email: string, nickname: string) {
    this.email = email;
    this.socket.connect(path, email);
    this.socket.emit('userConnection', email);
    this.socket.on('connectionAccepted', (data: any) => {
      console.log('aceptaron la conexion socket', data);
    });
    this.socket.on('command', (data) => {
      console.log('escuchando el dicho comando', data);

    });

  /*   this.socket.on('', (msg: any) => {
      console.log('recibiendo los mensajes');
      this.messages.push(msg);
      console.log(msg);
      console.log(this.messages);
      this.output += `<div id='container'><p>${msg.text}</p><span id='time-left'>${msg.date}</span></div>`;
    }); */

   /*  this.socket.on('message-received', (msg: any) => {
      console.log('recibiendo los mensajes');
      this.messages.push(msg);
      console.log(msg);
      console.log(this.messages);
      this.output += `<div id='container'><p>${msg.text}</p><span id='time-left'>${msg.date}</span></div>`;
    }); */

  }

  disconnect() {
  this.socket.emit('disconnect', '');
  }

  sendCommand () {
   const  data = {
      room: this.email,
      command: 'ON'
    };
    this.socket.emit('command', data);
  }



}
