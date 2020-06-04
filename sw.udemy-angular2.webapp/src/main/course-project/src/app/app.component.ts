import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

    /*
     Used to manually toggle views, eg.

       <div class="col-md-12">
         <app-recipes *ngIf="showRecipes"></app-recipes>
         <app-shopping-list *ngIf="!showRecipes"></app-shopping-list>
       </div>

     Replaced by routes
     */
    showRecipes = true;

    onShowFeature(feature) {
        console.log('featureSelected: ' + feature)
        this.showRecipes = (feature === "recipes");
    }

}
