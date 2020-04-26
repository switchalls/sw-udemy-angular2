import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  template: `
    <p>
      recipe-item works!
    </p>
  `,
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
