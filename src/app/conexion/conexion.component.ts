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

  connection;
  devices = {};
  constructor(private socket: SocketService) {
  }

  ngOnInit() {
    this.email = 'gustavosinbandera1';
    this.connection = this.socket.connect('', this.email);
    this.connection.emit('userConnection', this.email);
    this.connection.on('connectionAccepted', (data: any) => {
      console.log('aceptaron la conexion socket', data);
      this.devices = data;
    });
  }

  submit(path: string, email: string, nickname: string) {
  /*   this.email = email;
    this.connection = this.socket.connect(path, email);
    this.connection.emit('userConnection', email);
    this.connection.on('connectionAccepted', (data: any) => {
      console.log('aceptaron la conexion socket', data);
    }); */
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
