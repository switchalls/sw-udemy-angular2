import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {

    /*
     Used to manually toggle views, eg.

       <div class="col-md-12">
         <app-recipes *ngIf="showRecipes"></app-recipes>
         <app-shopping-list *ngIf="!showRecipes"></app-shopping-list>
       </div>

     Replaced by routes
     */
    showRecipes = true;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        // support page refresh by restoring saved credentials
        this.authService.autoSignIn();
    }

    onShowFeature(feature) {
        console.log('featureSelected: ' + feature)
        this.showRecipes = (feature === "recipes");
    }

}
