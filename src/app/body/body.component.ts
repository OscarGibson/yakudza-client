import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Globals, Cart } from '../app.globals';

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

  // public products_list: any;
  public filters_list: Array<any>;
  public globals = Globals;
  public cart = Cart;

  // private _products_get_path: string = 'http://localhost:8000/api/product';
  private _filters_get_path: string = 'http://localhost:8000/api/v1/tag';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.get_products();
    this.get_filters();
    this.get_shares_content();
    this.get_document_content();
    this.get_how_to_content();
    this.get_contact_content();
    this.get_social_content();
    this.get_feedback_content();
  }
  public test() {
    console.log(this.globals);
  }

  public get_filters() {

    this.http.get(this._filters_get_path, {headers: this.headers})
    .subscribe(
      data => {
        this.filters_list = data['tags'];
        for (var i = 0; i < this.filters_list.length; i++) {
          this.filters_list[i].class = '';
          // console.log(this.filters_list[i]);
        }
      },
      error => {
        console.log('ERROR: ', error);
      }
      )

  }

  private _abstract_filter(event, class_name, add= true) {

    let properties = ['class_add', 'class_remove'];
    
    if (add) properties.reverse();

    this.filters_list[event.path[1].id][properties[0]] = '';
    if (this.filters_list[event.path[1].id][properties[1]] == '') {
      this.filters_list[event.path[1].id][properties[1]] = class_name;
    }
    else {
      this.filters_list[event.path[1].id][properties[1]] = '';
    }
  }

  public add_filter(event) {
    this._abstract_filter(event, 'active-add');
  }
  public remove_filter(event) {
    this._abstract_filter(event, 'active-remove', false);
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
    this.globals.current_category = this.globals.categories[0];
  }

  public show_product(id: number) {
    for (let product of this.globals.products) {
      if (product.id == id) {
        this.globals.current_product = product;
        this.globals.show_product = true;
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
    console.log("cart remove: ", this.cart.items[item_id].item_count);
    console.log(this.cart.removeItem(item_id));
    console.log("cart remove: ", this.cart.items);
  }
  public clear_cart_items() {
    this.cart.clearCart();
  }
}


















