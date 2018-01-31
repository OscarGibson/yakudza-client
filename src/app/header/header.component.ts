import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals, Cart } from '../app.globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public right_nav_list: string[];
  public bottom_nav_list: any;
  private headers: HttpHeaders;

  public logo_path: string = '/assets/logo/Yakudza.svg';
  public globals = Globals;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  	this.get_categories(true);
    this.get_menu(true);
  }

  public get_categories(first_time= false) {

    this.http.get(this.globals.categories_get_path, 
      {headers:this.headers})
      .subscribe(data => {

        this.globals.categories = data['categories'];
        this.bottom_nav_list = this.globals.categories;
        for (let category of this.globals.categories) {

          for (let product of category.products) {

            let item_count = localStorage.getItem(product.id);
            if (!item_count === null) {
              Cart.addItemSimple(product.id, product.title, product.price, item_count);
            }
          }
        }

        if (first_time) this.change_categories(this.globals.categories[0].id);

      }, error => {

        console.log('ERROR: ', error);

      })
  }

  public change_categories(id: number) {
    this.globals.current_page = {'title':'main'};
    for (let category of Globals.categories) {
      if (category.id == id) {
        Globals.current_category = category;
      }
    }
  } 

  public get_menu(first_time= false) {

    this.http.get(Globals.menu_get_path, 
      {headers:this.headers})
      .subscribe(data => {

        Globals.menu = data['menu'];
        this.right_nav_list = Globals.menu;

        if (first_time) this.globals.current_page = {'title':'main'};

      }, error => {

        console.log('ERROR: ', error);

      })
  }

  public change_page(id: number) {
    Globals.current_page;
    for (let page of Globals.menu) {
      if (page.id == id) {
        Globals.current_page = page;
        this.globals.current_category = {'products' : []};
        break;
      }
    }
  }

    public show_callback() {
    this.globals.show_callback = true;
  } 


}