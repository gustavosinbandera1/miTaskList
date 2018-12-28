import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

import '@vaadin/vaadin-button';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-checkbox/vaadin-checkbox.js';

import { FormGroup, FormControl } from '@angular/forms';
import { TaskService } from '../services/task.service';

class Task {
  constructor(
    public firstName: string,
    public lastName: string,
    public isDone: boolean) {}
}
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {
  tasks: any; /*to store data from collection tasks*/
  people: Task[] = [];
  temp: any;
  isDone: boolean = true;

  constructor(private apiTask: TaskService) {
    this.apiTask.getTasks().subscribe(data => {
      console.log('los datos');
      this.tasks = data || {};
      console.log(this.tasks);
    });
  }
  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  addTask() {
    console.log('el checkbox' + this.isDone);
    this.people = [
      ...this.people,
      new Task(this.form.value.firstName, this.form.value.lastName, this.isDone)
    ];
    this.form.reset();
  }
ngOnInit() {
}
}
