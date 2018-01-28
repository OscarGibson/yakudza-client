import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Globals } from '../app.globals';

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

  public products_list: any;
  public filters_list: any;
  public globals = Globals;

  private _products_get_path: string = 'http://localhost:8000/api/product';
  private _filters_get_path: string = 'http://localhost:8000/api/filters';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.get_products();
    this.get_filters();
  }

  public get_products() {

    this.http.get(this._products_get_path, {headers: this.headers})
    .subscribe(
      data => {
        this.products_list = data;
      },
      error => {
        console.log('ERROR: ', error);
      }
      )

  }
  public test() {
    console.log(this.globals);
  }

  public get_filters() {

    this.http.get(this._filters_get_path, {headers: this.headers})
    .subscribe(
      data => {
        this.filters_list = data;
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
    this.filters_list[event.path[1].id][properties[1]] = class_name;
    // console.log(this.filters_list);
    // console.log(event.path[1].id);
    // console.log(properties);
  }

  public add_filter(event) {
    this._abstract_filter(event, 'active-add');
  }
  public remove_filter(event) {
    this._abstract_filter(event, 'active-remove', false);
  }

}
