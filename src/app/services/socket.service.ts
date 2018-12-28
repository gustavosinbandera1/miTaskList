import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket;
  constructor() {
  }
  connect(path: string, username: string, nickname: string) {
    if (!path) {
       path = 'http://localhost:3000';
    }
     return this.socket = io.connect(path, {query: `username= ${username}+${nickname} `});
  }

  on(eventName: any, callback: any) {
    if (this.socket) {
      this.socket.on(eventName, (data): any => {
        callback (data);
      });
    }
  }

  emit(eventName: any, data: any) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  }

  removeListener(eventName: any) {
    if (this.socket) {
      this.socket.removeListener(eventName);
    }
  }
}