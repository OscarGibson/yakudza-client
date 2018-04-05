import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals, Cart, AppReady } from '../app.globals';
import { HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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

  public bottom_nav_elements;
  public bottom_nav_poition: number;
  public bottom_nav;
  public show_nav_top: boolean;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // InlineSVGModule.forRoot({ baseUrl: this.globals.local_domain });
  	this.get_categories(true);
    this.get_menu(true);

    this.bottom_nav_elements = document.getElementById('header-bottomnav').getElementsByTagName('ul')[0].getElementsByTagName('li');
    this.bottom_nav_poition = document.getElementById('header-bottomnav').offsetTop;
    this.bottom_nav = document.getElementById('header-bottomnav');
  }

  @HostListener('window:scroll', ['$event'])
  public onNavScroll($event) {
    console.log(this.bottom_nav.offsetTop);
    // console.log(window.pageYOffset, this.bottom_nav_poition);

    if (window.pageYOffset >= this.bottom_nav.offsetTop + 50) {
      this.show_nav_top = true;
    } else {
      this.show_nav_top = false;
    }
    // // console.log(this.bottom_nav_elements);
    // for (let menu_element of this.bottom_nav_elements) {
    //   // console.log(menu_element.offsetTop);
    //   let ancor = menu_element.getElementsByTagName('a')[0];
    //   let link = ancor.getAttribute('href').substring(1);
    //   let refElement = document.getElementById(link);
    //   // console.log(refElement.offsetTop, window.pageYOffset);
    //   // console.log(refElement.getAttribute('href').substring(1));
    //   if (refElement.offsetTop >= window.pageYOffset + 20 && refElement.offsetTop <= window.pageYOffset + 50) {
    //     this.globals.current_category['slug'] = link;
    //     console.log(window.pageYOffset, refElement.offsetTop);
    //   }
    // }
    
    // this.globals.current_category['id'];


  }

  public sanitizeIcons(name: string) {
    // if (!(name)) return
    // this.http.get("/assets/svg/"+name+".svg")
    //      .subscribe((source:any) => {
    //        return source;
    //      });
    // return this.sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/'+name+'.svg');
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

        AppReady.oneComponentReady();

        this.globals.categories = [];
        this.globals.categories_filter = [];
        this.globals.products = [];
        let tmp_products = {};

        this.bottom_nav_list = this.globals.categories;
        for (let category of data['categories']) {

          this.globals.categories.push(category);
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
  } 

  public get_menu(first_time= false) {

    this.http.get(Globals.menu_get_path, 
      {headers:this.headers})
      .subscribe(data => {

        Globals.menu = data['menu'];
        this.right_nav_list = Globals.menu;

        AppReady.oneComponentReady();

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

  public go_to_main() {
    this.globals.current_page = {'title':'main'};
    this.globals.current_category = this.globals.categories[0];
  } 


}