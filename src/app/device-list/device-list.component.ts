import { Component, OnInit } from '@angular/core';

declare var wheelnav: any;
@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.less']
})
export class DeviceListComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
     let wheel = new wheelnav("wheelDiv");
    wheel.initWheel(["init", "create", "navigate","refresh"]);
    wheel.createWheel();




  }

}
