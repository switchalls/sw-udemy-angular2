import { Component, OnInit } from '@angular/core';

@Component({
  // selector: '[app-servers]', // by attribute, eg.     <div app-servers></div>
  // selector: '.app-servers',  // by class, eg.         <div class="app-servers"></div>
  selector: 'app-servers',      // by html element, eg.  <app-servers />
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
