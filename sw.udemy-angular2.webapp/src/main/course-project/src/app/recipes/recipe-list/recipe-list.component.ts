import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  template: `
    <p>
      recipe-list works!
    </p>
  `,
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
