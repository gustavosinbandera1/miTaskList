import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {

  constructor(private socket: SocketService) { }

  ngOnInit() {

  }

}
