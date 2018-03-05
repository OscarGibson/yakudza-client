import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Globals, Cart } from '../app.globals';

import { PhoneFormatPipe } from './body.pipe';

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
  public filter_object: FilterObject = new FilterObject();
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

  constructor(private http: HttpClient) { 
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
  }
  public test() {
    console.log(this.globals);
  }


  public get_filters() {

    this.http.get(this.globals.tags_get_path, {headers: this.headers})
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

  // private _abstract_filter(event, class_name, add= true) {

  //   let properties = ['class_add', 'class_remove'];
    
  //   if (add) properties.reverse();

  //   this.filters_list[event.path[1].id][properties[0]] = '';
  //   if (this.filters_list[event.path[1].id][properties[1]] == '') {
  //     this.filters_list[event.path[1].id][properties[1]] = class_name;
  //   }
  //   else {
  //     this.filters_list[event.path[1].id][properties[1]] = '';
  //   }
  // }

  public check_filter_add(tags, del= true, check_all= false) {
    if (this.globals.active_filters_add.length == 0 && check_all) return true;
    for (let i in this.globals.active_filters_add) {
      if (tags.includes(this.globals.active_filters_add[i])) {
        if (del) this.globals.active_filters_add.splice(+i,1);
        return true;
      }
    }
    return false;
  }
  public check_filter_remove(tags, del= true) {
    for (let i in this.globals.active_filters_remove) {
      if (tags.includes(this.globals.active_filters_remove[i])) {
        if (del) this.globals.active_filters_remove.splice(+i,1);
        return true;
      }
    }
    return false;
  }

  public add_filter(event, filter_id) {

    // NEW
    this.filter_object.setElement(filter_id, true);

    if (!this.check_filter_add([filter_id])) {
      this.globals.active_filters_add.push(filter_id);
    }
    this.check_filter_remove([filter_id])
    // this.globals.categories = [];
    // this._abstract_filter(event, 'active-add');
    // for (let category of this.globals.categories_main) {
    //   let new_categories = [];
    //   new_categories['name'] = category.name;
    //   new_categories['slug'] = category.slug;
    //   new_categories['products'] = [];

    //   for (let product of category.products) {

    //     if (product.tags.includes(filter_id)) {

    //       new_categories['products'].push(product);
    //     }
    //   }

    //   this.globals.categories.push(new_categories);

    // }

    // console.log(this.globals.categories_main);
  }
  public remove_filter(event, filter_id) {
    
    // NEW
    this.filter_object.setElement(filter_id, false);

    // this._abstract_filter(event, 'active-remove', false);
    if (!this.check_filter_remove([filter_id])) {
      this.globals.active_filters_remove.push(filter_id);
      console.log('pipka', this.globals.active_filters_remove);
    }
    this.check_filter_add([filter_id])
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
    this.globals.current_category = this.globals.categories[0];
  }

  public show_product(id: number) {
    console.log(this.globals.products);
    // for (let category of this.globals.categories) {

    //   for (let product of category.products) {
    //     if (product.id == id) {
    //       this.globals.current_product = product;
    //       this.globals.show_product = true;
    //       break;
    //     }
    //   }

      for (let index = 0; index < this.globals.products.length; index++) {
        // console.log(this.globals.products[index].id);
        if (this.globals.products[index].id == id) {
          this.globals.current_product = this.globals.products[index];
          this.globals.show_product = true;

          try {
            this.next_product_id = this.globals.products[index + 1].id;
            // this.next_product_id = index + 1;
          }
          catch(e) {
            console.log(e);
            this.next_product_id = this.globals.products[0].id;
          }

          try {
            this.prew_product_id = this.globals.products[index - 1].id;
            // this.prew_product_id = index - 1;
          }
          catch(e) {
            console.log(e);
            this.prew_product_id = this.globals.products[this.globals.products.length - 1].id;
          }

          console.log(this.prew_product_id);
          console.log(index);
          console.log(this.next_product_id);
          
          // console.log(this.globals.products);
          
          break;
        }
        
      }



    // }
    
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
    console.log("cart remove: ", this.cart.items[item_id].item_count);
    console.log(this.cart.removeItem(item_id));
    console.log("cart remove: ", this.cart.items);
  }
  public clear_cart_items() {
    this.cart.clearCart();
  }

  public show_order() {
    this.globals.current_page = {'title':'Оформлення замовлення'};
    this.globals.current_category = {'products' : []};    
  }

  public create_feedback(form_id) {
    console.log('feedback data:', form_id);
    let form = document.getElementById(form_id);
    console.log(form);
    let inputs = form.getElementsByTagName('input');
    console.log('Inputs: ',inputs);
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
    console.log('callback data:', form_id);
    let form = document.getElementById(form_id);
    console.log(form);
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

  public filter_items() {
    this.globals.active_filters_add;
    this.globals.active_filters_remove;

    this.globals.categories_filter = [];

   

    if (this.filter_object.length == 0) {
      Object.assign(this.globals.categories_filter, this.globals.categories);
    } else {

      for (let new_category of this.globals.categories) {
        for (let new_product of new_category) {
          if (1) { // WORK POINT!!!!!
            new_category.push(new_product);
          }
        }
      }

    }
    
  }

  private hasMutual(array_1: Array<any>, array_2: Array<any>) {
    for (let el of array_1) {
      if (array_2.includes(el)) return true;
    }
    return false;
  }

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


  public create_order(form_id: string) {
    let form = document.getElementById(form_id);
    let elements = form.getElementsByTagName('input');
    
    let address = elements[0].value;
    let phone = elements[1].value;
    let name = elements[2].value;
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
      "products" : products
    };

    this.http.post(this.globals.order_post_path, data, {headers: this.headers})
    .subscribe( response => {
      console.log(response);

      this.globals.display_message("Ваше замовлення прийняте");
    }, error => {
      console.log(error);
    });


  }


}



class FilterObject {
  public body;
  public length;

  constructor() {
    this.length = 0;
  }

  public setElement(index, value) {
    this.body[index] = value;
    this.length += 1;
  }
  public removeElement(index) {
    if (this.body[index] !== undefined) this.length -= 1;
    delete this.body[index];
  }
  public getElement(index) {
    return this.body[index];
  }
}











