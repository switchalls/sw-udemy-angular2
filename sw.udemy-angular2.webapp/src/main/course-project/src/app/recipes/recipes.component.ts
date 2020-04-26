import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  template: `
    <p>
      recipes works!
    </p>
  `,
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
