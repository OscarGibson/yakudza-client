import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  public static local_domain: string = 'http://localhost:4200';
  public static backend_domain: string = 'http://localhost:8000';
  private static _domain: string = 'http://localhost:8000';
  private static _api_path: string = '/api/v1/';
  public static categories_get_path: string = Globals._get_path('category');
  public static order_post_path: string = Globals._get_path('order');
  public static tags_get_path: string = Globals._get_path('tag');
  public static menu_get_path: string = Globals._get_path('section/menu');
  public static menu: Array<any>;
  public static current_page = {
  	'title' : 'main'
  };
  public static section_get_path: string = Globals._get_path('section/');
  public static categories: Array<any>;
  public static feedback_path: string = Globals._get_path('feedback');
  public static current_category = {
  	'products' : []
  };
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
        "phone": ""
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


  private static _get_path(name: string): string {
  	return Globals._domain + Globals._api_path + name;
  }

  public static show_callback: boolean = false;
  public static show_subs: boolean = false;
  public static show_product: boolean = false;

  public static current_product = {
  	"id": '',
    "title": "",
    "slug": "",
    "description": "",
    "image": "",
    "price": 0,
    "weight": 0,
    "kkal": 0,
  };
}
