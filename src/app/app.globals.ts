import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  public static categories_get_path: string = 'http://localhost:8000/api/categories/';
  public static categories;
  public static current_category = {
  	'products' : []
  };
}
