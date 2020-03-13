import { Component, OnInit } from '@angular/core';

@Component({
  // selector: '[app-servers]', // by attribute, eg.     <div app-servers></div>
  // selector: '.app-servers',  // by class, eg.         <div class="app-servers"></div>
  selector: 'app-servers',      // by html element, eg.  <app-servers />
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer: boolean = false;

  serverAdded: boolean = false;

  serverName: string = "myServer";

  servers = [];

  constructor() {
    setTimeout(() => {
        this.allowNewServer = true;
    }, 5000);
  }

  ngOnInit(): void {
  }

  onAddServer() {
    this.serverAdded = true;
    this.servers.push(this.serverName);
  }

  // for one-way data binding
  onServerNameChanged(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

}