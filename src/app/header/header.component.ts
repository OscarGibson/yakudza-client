import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../app.globals';

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

  constructor(private http: HttpClient) { }

  ngOnInit() {
  	this.get_categories();
    this.get_menu();
  }

  public get_categories() {

    this.http.get(Globals.categories_get_path, 
      {headers:this.headers})
      .subscribe(data => {

        Globals.categories = data['categories'];
        console.log(Globals.categories);
        this.bottom_nav_list = Globals.categories;
        console.log(this.bottom_nav_list);

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

  public get_menu() {

    this.http.get(Globals.menu_get_path, 
      {headers:this.headers})
      .subscribe(data => {

        Globals.menu = data['menu'];
        console.log(Globals.menu);
        this.right_nav_list = Globals.menu;
        console.log(this.right_nav_list);

      }, error => {

        console.log('ERROR: ', error);

      })
  }

  public change_page(id: number) {
    Globals.current_page;
    for (let page of Globals.menu) {
      if (page.id == id) {
        Globals.current_page = page;
        console.log(Globals.current_page);
      }
    }
  }

    public show_callback() {
    this.globals.show_callback = true;
  } 


}