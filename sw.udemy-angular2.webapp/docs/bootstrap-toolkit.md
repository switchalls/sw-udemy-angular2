# Bootstrap Toolkit

View [getting started](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

## Widgets

* [Dropdown menu](https://getbootstrap.com/docs/4.0/components/dropdowns/)
  
  eg. `recipe-detail.component.html`
  
  ```
  <button class="btn btn-primary dropdown-toggle">
      Manage Recipe <span class="caret"></span>
  </button>
  <ul class="dropdown-menu">
      <li>To Shopping List</li>
      <li>Edit Recipe</li>
      <li>Delete Recipe</li>
  </ul>
  ```

* [Data form](https://getbootstrap.com/docs/4.0/components/forms/)
  
  eg. `shopping-edit.component.html`
  
  ```
  <div class="col-sm-2 form-group">
      <label for="amount">Amount</label>
      <input type="number" id="amount" class="form-control"/>
  </div>
  ```

* [Grid System](https://getbootstrap.com/docs/4.0/layout/grid/)
  
  eg. `shopping-list.component.html`
  
  ```
  <div class="row">
      <div class="col-md-10">
  ```

* [List group](https://getbootstrap.com/docs/4.0/components/list-group/)
  
  eg. `recipe-list.component.html`
  
  ```
  <a href="#" class="list-group-item clearfix" *ngFor="let recipe of recipes">
      <div class="pull-left">
          <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
          <p class="list=group-item-text">{{ recipe.description }}</p>
      </div>
      <span class="pull-right">
          <img [src]="recipe.imagePath" alt="{{ recipe.name }}" class="img-responsive" style="max-height: 50px" />
      </span>
  </a>
  ```

* [Navigation bar](https://getbootstrap.com/docs/4.0/components/navbar/)
  
  eg. `app-header.component.html`
  
  ```
  <nav class="navbar navbar-default">
  ```
