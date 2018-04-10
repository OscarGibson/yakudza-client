import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Globals, Cart, FilterObject, AppReady } from '../app.globals';

import { PhoneFormatPipe } from './body.pipe';

import { HostListener } from '@angular/core';

import { LiqPayCheckout } from '../LiqPayModule/LiqPayModule';

declare global {
    interface Window { LiqPayCheckoutCallback: any; }
}

import * as $ from 'jquery';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  providers: [ Globals ]
})
export class BodyComponent implements OnInit {

  public shares_path: string = 'assets/img/shares.jpg';
  public product_path: string = 'assets/img/havka.jpg';
  public shares_2_path: string = 'assets/img/shares_image.jpg';

  public document_image: string = 'assets/img/document.jpg';

  public how_to_icon: string = 'assets/img/howToIcon.png';

  public logo_path: string = '/assets/logo/Yakudza.svg';

  private headers: HttpHeaders;

  // private remove_icon_active: string = '/assets/svg/X_red.svg';
  // private remove_icon: string = '/assets/svg/X.svg';
  // public remove_icon_path;

  // public products_list: any;
  public filters_list: Array<any>;
  public filter_object: FilterObject;
  public globals = Globals;
  public cart = Cart;

  // private _products_get_path: string = 'http://localhost:8008/api/product';

  // private _filters_get_path: string = 'http://localhost:8000/api/v1/tag';
  // private _callback_post_path: string = 'http://localhost:8000/api/v1/callback';
  // private _feedback_post_path: string = 'http://localhost:8000/api/v1/feedback';

  public next_product_id: number;
  public prew_product_id: number;


  private _filters_get_path: string = 'http://oscargibson.pythonanywhere.com/backend/api/v1/tag';
  private _callback_post_path: string = 'http://oscargibson.pythonanywhere.com/backend/api/v1/callback';
  private _feedback_post_path: string = 'http://oscargibson.pythonanywhere.com/backend/api/v1/feedback';

  public cart_in_top: boolean;
  public cart_out: boolean;
  public cart_position: number;
  public cart_element;
  public footer;
  public propos_in_top: boolean;
  public propos_out: boolean;

  private liqPayCheckout;

  constructor(private http: HttpClient) { 
    this.filter_object = new FilterObject([]);
  }

  @HostListener('window:scroll', ['$event'])
  public onNavScroll($event) {

    // console.log(window.pageYOffset, this.cart_element.offsetTop + 30);

    if (window.pageYOffset >= this.cart_element.offsetTop + 30) {
      this.cart_in_top = true;
    } else {
      this.cart_in_top = false;
    }

    if (this.footer.offsetTop <= window.pageYOffset + $(this.cart_element).children().height() + 100) {
      this.cart_out = true;
    } else {
      this.cart_out = false;
    }

    // console.log(this.footer.offsetTop, window.pageYOffset + $(this.cart_element).children().height() + 100);

    if (this.globals.current_page.title == 'Оформлення замовлення') {
      console.log(this.globals.propos_element);
      this.globals.propos_element = document.getElementById('propos');
      console.log($(this.globals.propos_element).position().top);
      if (window.pageYOffset >= this.globals.propos_element.offsetTop + 30) {
        this.propos_in_top = true;
      } else {
        this.propos_in_top = false;
        // console.log(window.pageYOffset, $(this.propos_element).position().top, false);
      }

      if (this.footer.offsetTop <= window.pageYOffset + $(this.globals.propos_element).height() + 100) {
        this.propos_out = true;
        // console.log(3);
      } else {
        this.propos_out = false;
        // console.log(4);
      }
    }

    

  }

  ngOnInit() {
    // this.get_products();
    this.get_filters();
    this.get_shares_content();
    this.get_document_content();
    this.get_how_to_content();
    this.get_contact_content();
    this.get_email_content();
    this.get_social_content();
    this.get_feedback_content();

    this.liqPayCheckout = new LiqPayCheckout().liqPayCheckout;

    this.cart_element = document.getElementById('cart');
    // this.cart_position = document.getElementById('cart').offsetTop;
    this.cart_position = this.cart_element.offsetTop;
    

    this.footer = document.getElementById('footer-banner');

  }
  public test() {
    console.log(this.globals);
  }


  public get_filters() {

    this.http.get(this.globals.tags_get_path, {headers: this.headers})
    .subscribe(
      data => {
        this.filter_object = new FilterObject(data['tags']);
        console.log('filters_2 ',this.filter_object);
      },
      error => {
        console.log('ERROR: ', error);
      }
      )
  }

  // public check_filter_add(tag) {
  //   if (this.filter_object.getElement(tag) === 1) return true;
  //   return false;
  // }
  // public check_filter_remove(tag) {
  //   if (this.filter_object.getElement(tag) === -1) return true;
  //   return false;
  // }

  public changeFilter(id, status) {
    this.filter_object.setElement(id, status);
    this.filter_products();
  }

  public filter_products() {

    if (!this.filter_object.isFilterActive()) {
       this.globals.categories_filter = this.globals.categories.slice();
       console.log('not active',this.globals.categories_filter);
       return;
    }
    this.globals.categories_filter = [];
    for (let i = 0; i < this.globals.categories.length; i++) {

      this.globals.categories_filter[i] = {
        'slug' : this.globals.categories[i].slug,
        'name' : this.globals.categories[i].name,
        'products' : []
      };

      for (let product of this.globals.categories[i].products) {
        for (let filter of this.filter_object.iterator) {
          if (
            product.tags.includes(filter.id) && filter.status === 1
            || !product.tags.includes(filter.id) && filter.status === -1
            ) {
            this.globals.categories_filter[i].products.push(product);
          }
        }
      }
    }

    console.log(this.filter_object.iterator);


    this.globals.get_ancors_position();

  }


  public get_shares_content() {
     this.http.get(this.globals.section_get_path + 'shares', {headers: this.headers})
      .subscribe(
        data => {
          this.globals.shares_content = data['shares_section'];
        },
        error => {
          console.log('ERROR: ', error);
        }
        )
  }

  public get_document_content() {
    this.http.get(this.globals.section_get_path + 'document', {headers: this.headers})
      .subscribe(
        data => {
          this.globals.document_content = data['document_section'];
        },
        error => {
          console.log('ERROR: ', error);
        }
        )
  }

  public get_how_to_content() {
    this.http.get(this.globals.section_get_path + 'how-to', {headers: this.headers})
      .subscribe(
        data => {
          this.globals.how_to_content = data['how_to_section'];
        },
        error => {
          console.log('ERROR: ', error);
        }
        )
  }

  public get_contact_content() {
    this.http.get(this.globals.section_get_path + 'contact', {headers: this.headers})
      .subscribe(
        data => {
          this.globals.contact_content = data['contact_section'];
          AppReady.oneComponentReady();
        },
        error => {
          console.log('ERROR: ', error);
        }
        )
  }

  public get_email_content() {
    this.http.get(this.globals.section_get_path + 'email', {headers: this.headers})
      .subscribe(
        data => {
          this.globals.email_content = data['email_section'];
        },
        error => {
          console.log('ERROR: ', error);
        }
        )
  }

  public get_social_content() {
    this.http.get(this.globals.section_get_path + 'social', {headers: this.headers})
      .subscribe(
        data => {
          this.globals.social_content = data['social_section'];
        },
        error => {
          console.log('ERROR: ', error);
        }
        )
  }

  public get_feedback_content() {
    this.http.get(this.globals.feedback_path, {headers: this.headers})
      .subscribe(
        data => {
          this.globals.feedback_content = data['feedbacks'];
        },
        error => {
          console.log('ERROR: ', error);
        }
        )
  }

  public go_to_main() {
    this.globals.current_page = {'title':'main'};
    // this.globals.current_category = this.globals.categories[0];
  }

  public show_product(id: number) {

      for (let index = 0; index < this.globals.products.length; index++) {
        if (this.globals.products[index].id == id) {
          this.globals.current_product = this.globals.products[index];
          this.globals.show_product = true;

          try {
            this.next_product_id = this.globals.products[index + 1].id;
          }
          catch(e) {
            this.next_product_id = this.globals.products[0].id;
          }

          try {
            this.prew_product_id = this.globals.products[index - 1].id;
          }
          catch(e) {
            this.prew_product_id = this.globals.products[this.globals.products.length - 1].id;
          }          
          break;
        }
        
      }    
  }

  public close_modal(type: string) {
    switch (type) {
      case "product":
        this.globals.show_product = false;
        break;
      case "subs":
        this.globals.show_subs = false;
        break;
      case "callback":
        this.globals.show_callback = false;
        break;
      case "message":
        this.globals.show_message = false;
        break;
    }
  }

  public add_cart_item(item_id: number) {
    this.cart.addItem(item_id);
    this.close_modal('product');
    console.log("cart: ", item_id, this.cart.items);
  }
  public plus_cart_item(item_id: number) {
    this.cart.plusItem(item_id);
  }
  public minus_cart_item(item_id: number) {
    console.log("cart minus: ", this.cart.items[item_id].item_count);
    this.cart.minusItem(item_id);
    console.log("cart minus: ", this.cart.items);
  }
  public remove_cart_item(item_id: number) {
    this.cart.removeItem(item_id);
  }
  public clear_cart_items() {
    this.cart.clearCart();
  }

  public show_order() {
    this.globals.current_page = {'title':'Оформлення замовлення'};
    this.globals.current_category = {'products' : []};
    setTimeout( () => {
      this.globals.propos_element = document.getElementById('propos');
      console.log(this.globals.propos_element);
    }, 100);
  }

  public create_feedback(form_id) {
    let form = document.getElementById(form_id);
    let inputs = form.getElementsByTagName('input');
    let author = inputs[0].value;
    let cell = inputs[1].value;
    let content = form.getElementsByTagName('textarea')[0].value;

    if (author && cell && content) {
      this.http.post(this.globals.feedback_post_path,{'author':author, 'cell':cell, 'content':content}, {headers: this.headers})
      .subscribe(
        data => {
          console.log('DATA:', data);
          this.get_feedback_content();

          this.globals.display_message("Ваш відгук був доданий");
        },
        error => {
          console.log('ERROR: ', error);
        }
      )
    } else {
      console.log();
    }
  }

  public create_callback(form_id: string) {
    let form = document.getElementById(form_id);
    let inputs = form.getElementsByTagName('input');
    let name = inputs[0].value;
    let cell = inputs[1].value;

    if (name && cell) {
      this.http.post(this.globals.callback_post_path,{'name':name, 'cell':cell}, {headers: this.headers})
      .subscribe(
        data => {
          console.log('DATA:', data);

          this.globals.show_callback = false;
          this.globals.display_message("Незабаром вам зателефонують");
        },
        error => {
          console.log('ERROR: ', error);
        }
      )
    } else {
      console.log();
    }

  }

  // private hasMutual(array_1: Array<any>, array_2: Array<any>) {
  //   for (let el of array_1) {
  //     if (array_2.includes(el)) return true;
  //   }
  //   return false;
  // }

  public changeCurrentPropos(direction, category_index: number) {

    let product_index;
    if (direction == 'left') {
      product_index = this.globals.order_content[category_index].current_content.prew_id;
    } else if (direction == 'right') {
      product_index = this.globals.order_content[category_index].current_content.next_id;
    }

    let new_product = this.globals.order_content[category_index].content.content[product_index];

    let next_id = this.globals.order_content[category_index].current_content.next_id + 1;
    let prew_id = this.globals.order_content[category_index].current_content.next_id - 1;

    this.globals.order_content[category_index].current_content = {
      "id"    : new_product.id,
      "title" : new_product.title,
      "image" : new_product.image,
      "price" : new_product.price,
      "next_id" : next_id >= this.globals.order_content[category_index].content.content.length ? 0 : next_id,
      "prew_id" : prew_id < 0 ? this.globals.order_content[category_index].content.content.length - 1 : prew_id,
    };

  }


  public create_order(form_id: string, type= 0) {
    let form = document.getElementById(form_id);
    let elements = form.getElementsByTagName('input');
    
    let address = elements[0].value;
    let phone = elements[1].value;
    let name = elements[2].value;
    let count = elements[3].value;
    let text = form.getElementsByTagName('textarea')[0].value;
    let products = [];

    for (let item of this.cart.items) {
      products.push({
        "pk" : item.item_id,
        "count" : item.item_count
      });
    }

    let data = {
      "address" : address,
      "phone" : phone,
      "name" : name,
      "comment" : text,
      "products" : products,
      "count" : count,
      "type" : type
    };

    this.http.post(this.globals.order_post_path, data, {headers: this.headers})
    .subscribe( response => {

      if (response['message'] === 'success') {
        console.log('success');
      } else if (response['message'] === 'redirect') {

      console.log('function ', this.liqPayCheckout);

      let _liqPayCheckout = this.liqPayCheckout;

      window.LiqPayCheckoutCallback = () => {
        _liqPayCheckout.init({
            data: response['hash_data'],
            signature: response['signature'],
            embedTo: "#liqpay_checkout",
            mode: "popup" // embed || popup,
        }).on("liqpay.callback", function(data){
            console.log(data.status);
            console.log(data);
        }).on("liqpay.ready", function(data){
            // ready
        }).on("liqpay.close", function(data){
            this.globals.display_message("Ваше замовлення прийняте");
            this.cartshow.clearCart();
        });
      };

      window.LiqPayCheckoutCallback();

      // console.log(response['data']);
      // console.log(response['signature'])
      }

    }, error => {
      console.log(error);
    });
  }


}












