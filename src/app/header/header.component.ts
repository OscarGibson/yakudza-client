import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals, Cart } from '../app.globals';
import { HostListener } from '@angular/core';

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

  public bottom_nav_poition: number;
  public show_nav_top: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  	this.get_categories(true);
    this.get_menu(true);

    this.bottom_nav_poition = document.getElementById('header-bottomnav').offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  public onNavScroll($event) {
    // console.log($event);
    // console.log(window.pageYOffset, this.bottom_nav_poition);

    if (window.pageYOffset >= this.bottom_nav_poition + 50) {
      this.show_nav_top = true;
    } else {
      this.show_nav_top = false;
    }
  }

  public get_order_content() {
    this.http.get(this.globals.section_get_path + 'order', {headers: this.headers})
      .subscribe(
        data => {
          this.globals.order_content = [];

          for (let category of this.globals.categories) {
            for (let order_content of data['order_section']) {
              if (category.id == order_content.id) {

                this.globals.order_content.push({
                    "content" : {
                      "id": category.id,
                      "title": order_content.title,
                      "content": category.products,
                    },
                    "current_content" : {
                      'id' : category.products[0].id,
                      'title' : category.products[0].title,
                      'image' : category.products[0].image,
                      'price' : category.products[0].price,
                      'next_id' : category.products.length > 0 ? 1 : 0,
                      'prew_id' : category.products.length - 1,
                    }
                  });

              }
            }
          }

          console.log(this.globals.order_content)
          
        },
        error => {
          console.log('ERROR: ', error);
        }
    )
  }

  public get_categories(first_time= false) {

    this.http.get(this.globals.categories_get_path, 
      {headers:this.headers})
      .subscribe(data => {

        this.globals.categories = [];
        this.globals.categories_filter = [];
        this.globals.categories_main = [];
        this.globals.products = [];
        let tmp_products = {};

        this.bottom_nav_list = this.globals.categories;
        for (let category of data['categories']) {

          this.globals.categories.push(category);
          this.globals.categories_main.push(category);
          this.globals.categories_filter.push(category);

          for (let product of category.products) {

            tmp_products[product.id] = product;

            let item_count = localStorage.getItem(product.id);
            if (!item_count === null) {
              Cart.addItemSimple(product.id, product.title, product.price, item_count, product.image, product.weight, product.pieces);
            }
          }
        }

        this.get_order_content();

        for (let key in tmp_products) {
            this.globals.products.push(tmp_products[key]);
          }

        if (first_time) this.change_categories(this.globals.categories[0].id);

      }, error => {

        console.log('ERROR: ', error);

      })
  }

  public change_categories(id: number) {
    this.globals.current_page = {'title':'main'};

    this.globals.current_category['id'] = id;
    // for (let category of Globals.categories) {
    //   if (category.id == id) {
    //     Globals.current_category = category;
    //   }
    // }
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
    // Globals.current_page;
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