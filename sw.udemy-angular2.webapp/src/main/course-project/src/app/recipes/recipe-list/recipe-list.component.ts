import { Component, OnInit } from '@angular/core';

import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

    recipes: Recipe[] = [
        new Recipe("Vanilla Cake", "A classic vanilla cake recipe made completely from scratch!", "https://i2.wp.com/www.sugarspunrun.com/wp-content/uploads/2018/01/Vanilla-Cake-Recipe-1-of-1-15.jpg"),
        new Recipe("Beckys Butter Cake", "Butter cake recipe reminiscent of the 1-2-3-4 cake that Grandma may have baked", "https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/16730-beckys-butter-cake-600x600.jpg?ext=.jpg"),
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
