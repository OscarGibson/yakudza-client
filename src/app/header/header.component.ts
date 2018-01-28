import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../app.globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public right_nav_list: string[] = [
  	'shares',
  	'feedbacks',
  	'documents',
  	'how to',
  	'contacts'
  ];
  public bottom_nav_list: any;
  private headers: HttpHeaders;

  private _categories_get_path: string = 'http://localhost:8000/api/categories/';

  public logo_path: string = '/assets/logo/Yakudza.svg';
  public globals = Globals;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  	this.get_categories();
  }

  public get_categories() {

  this.http.get(Globals.categories_get_path, 
    {headers:this.headers})
    .subscribe(data => {

      Globals.categories = data;
      this.bottom_nav_list = Globals.categories;

    }, error => {

      console.log('ERROR: ', error);

    })
  }

  public change_categories(id: number) {
    Globals.current_category;
    for (let category of Globals.categories) {
      if (category.id == id) {
        Globals.current_category = category;
        console.log(Globals.current_category);
      }
    }
  } 

}