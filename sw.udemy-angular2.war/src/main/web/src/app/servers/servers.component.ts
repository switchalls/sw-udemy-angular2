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

  serverCreationStatus: string = "";

  serverName: string = "TestServer";

  constructor() {
    setTimeout(() => {
        this.allowNewServer = true;
    }, 5000);
  }

  ngOnInit(): void {
  }

  onAddServer() {
    this.serverCreationStatus = "Added server: " + this.serverName;
  }

  // for one-way data binding
  onServerNameChanged(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

}