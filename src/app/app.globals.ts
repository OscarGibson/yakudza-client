import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  // public static local_domain: string = 'http://localhost:4200';
  // public static backend_domain: string = 'http://localhost:8000/backend';
  // private static _domain: string = 'http://localhost:8000/backend';

  public static local_domain: string = 'http://www.yakuzalviv.com';
  public static backend_domain: string = 'http://www.yakuzalviv.com/backend';
  private static _domain: string = 'http://www.yakuzalviv.com/backend';

  private static _api_path: string = '/api/v1/';
  public static categories_get_path: string = Globals._get_path('category');
  public static order_post_path: string = Globals._get_path('order/');
  public static tags_get_path: string = Globals._get_path('tag');
  public static menu_get_path: string = Globals._get_path('section/menu');
  public static order_get_path: string = Globals._get_path('section/order');

  public static callback_post_path: string = Globals._get_path('callback');
  public static feedback_post_path: string = Globals._get_path('feedback');
  public static subs_post_path: string = Globals._get_path('subs');


  public static menu: Array<any>;
  public static current_page = {
  	'title' : 'main'
  };
  public static section_get_path: string = Globals._get_path('section/');

  public static categories: Array<any> = [
    {'slug':'', 'name' : '','products': [], 'position' : -1},
  ];
  public static categories_filter;
  public static categories_main;
  public static feedback_path: string = Globals._get_path('feedback');
  public static current_category = {
  	'products' : []
  };
  public static products;
  public static shares_content = [
  	{'image':'', 'content':''}
  ];
  public static document_content = [
  	{
  		'id' : '',
  		'title' : '',
  		'content' : '',
  		'image_1' : '',
  		'image_2' : '',
  		'image_3' : '',
  		'image_4' : '',
  		'image_5' : '',
  		'image_6' : '',
  	}
  ];

  public static how_to_content = [
  	{
	    "id": 0,
	    "title": "",
	    "content": "",
	    "icon": ""
    },
  ];

  public static contact_content = [
  	{
        "id": 0,
        "icon" : "",
        "phone": ""
    },
  ];

  public static email_content = [
    {
        "id": 0,
        "email": ""
    },
  ];

  public static social_content = [
  	{
        "id": '',
        "icon": "facebook",
        "link": ""
    },
  ];

  public static feedback_content = [
  	{
  		'id' : '',
  		'author' : '',
  		'content' : '',
  	}
  ];

  public static  propos_element;

  // public static order_content = {
  //     "content": [
  //           {
  //             "id": -1,
  //             "title": "",
  //             "content": [],
  //           },
  //       "current_content" : {
  //         "id"    : -1,
  //         "title" : "",
  //         "image" : "",
  //         "price" : "",
  //         "next_id" : -1,
  //         "prew_id" : -1,
  //       },
  //     ],
  //   };

    public static order_content = [
      {
        "content" : {
          "id": -1,
          "title": "",
          "content": [],
        },
        "current_content" : {
          "id"    : -1,
          "title" : "",
          "image" : "",
          "price" : "",
          "next_id" : -1,
          "prew_id" : -1,
        }
      }
    ]

  private static _get_path(name: string): string {
  	return Globals._domain + Globals._api_path + name;
  }

  public static show_callback: boolean = false;
  public static show_subs: boolean = false;
  public static show_product: boolean = false;
  public static show_message: boolean = false;

  public static current_product = {
  	"item_id": "",
  	"id": '',
    "title": "",
    "slug": "",
    "description": "",
    "image": "",
    "price": 0,
    "weight": 0,
    "kkal": 0,
  };

  public static message: string;

  public static display_message(message) {
    Globals.show_message = true;
    Globals.message = message;
  }

  public static get_ancors_position() {
    for (let i = 0; i < Globals.categories.length; i++) {
      let offset = document.getElementById(Globals.categories[i].slug).offsetTop;
      Globals.categories[i].position = offset;
    }
  }

}


@Injectable()
export class Cart {
  public static items: CartItem[] = [];
  public static total: number = 0;

  private static findElement(item_id) {
    for(let index = 0; index < Cart.items.length; index++) {
      if (Cart.items[index].item_id == item_id) {
        return index;
      }
    }
    return -1;
  }

  public static addItem(item_id: number) {
    let break_loop = false;
    for(let category of Globals.categories) {
      for (let product of category.products) {
        if (product.id == item_id) {

          let is_in_cart = Cart.findElement(item_id);

          if (is_in_cart != -1){
          	Cart.plusItem(is_in_cart);
          	break_loop = true;
          	break;
          }

          let item = new CartItem(item_id,product.title,product.price,1, product.image, product.weight, product.kkal);
          Cart.items.push(item);
          Cart.total += item.item_price;
          localStorage.setItem(item_id.toString(), '1');
          break_loop = true;
          break;
        } 
      }
      if (break_loop) break;
    }
  }

  public static addItemSimple(item_id,title,price,count, image, weight, kkal) {
    let item = new CartItem(item_id,title,price,count, image, weight, kkal);
    Cart.items[item_id] = item;
    Cart.total += item.item_price;
  }

  public static plusItem(item_id: number) {
    Cart.items[item_id].item_count += 1;
    Cart.items[item_id].item_total = + (Cart.items[item_id].item_count*Cart.items[item_id].item_price).toFixed(2);
    Cart.total += + (Cart.items[item_id].item_price).toFixed(2);
    localStorage.setItem(item_id.toString(), Cart.items[item_id].item_count.toString());
  }

  public static minusItem(item_id: number) {
    if (Cart.items[item_id].item_count > 1) {
      Cart.items[item_id].item_count -= 1;
      Cart.items[item_id].item_total = + (Cart.items[item_id].item_count*Cart.items[item_id].item_price).toFixed(2);
      Cart.total -= Cart.items[item_id].item_price;
      Cart.total = + (Cart.total).toFixed(2);
      localStorage.setItem(item_id.toString(), Cart.items[item_id].item_count.toString());
    }
  }

  public static removeItem(item_id: number) {
    Cart.total -= Cart.items[item_id].item_price*Cart.items[item_id].item_count;
    Cart.total = + (Cart.total).toFixed(2);
    localStorage.removeItem(item_id.toString());
    Cart.items.splice(item_id, 1);
  }

  public static clearCart() {
    Cart.total = 0;
    for (let key in Cart.items) {
      localStorage.removeItem(Cart.items[key].item_id.toString());
    }
    Cart.items = [];
  }

}

class CartItem {
  public item_total: number;

  constructor(
    public item_id: number, 
    public item_name: string, 
    public item_price:number, 
    public item_count: number,
    public item_image: string,
    public item_weight: number,
    public item_kkal: number
    ) {
      this.item_total = this.item_price*this.item_count;
  }

   
}



class Product {
  constructor(public title: string,
    public description: string,
    public price: number,
    public weight: number,
    public kkal: number,
    public image: string) {}
}




export class FilterObject {
  public iterator;
  public dict;

  constructor(filters) {
    this.iterator = [];
    this.dict = {};
    for (let filter of filters) {
      this.addElement(new FilterElement(filter.id, filter.name, filter.slug, 0));
    }
  }

  public addElement(filter_element) {
    this.iterator.push(filter_element);
    this.dict[filter_element.id] = filter_element;
  }
  public getElement(id) {
    return this.dict[id];
  }
  public setElement(id, status) {
    try {
      this.dict[id].status = status;
      return true;
    } catch(e){
      return false;
    }
  } 

  public isFilterActive() {
    for (let filter_element of this.iterator) {
      if (filter_element.status !== 0) return true;
    }
    return false;
  }
}

class FilterElement {
  constructor(public id, public name, public slug, public status) {}
}

@Injectable()
export class AppReady {
  private static count:number = 0;
  private static max_count:number = 3;
  public static app_ready:boolean = false;
  public static oneComponentReady() {
    AppReady.count++;
    AppReady.check();
  }
  private static check() {
    if (AppReady.count == AppReady.max_count) {
      AppReady.app_ready = true;
    }
  }
}




