import { Component, OnInit } from '@angular/core';

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
  public bottom_nav_list: string[] = [
  	'recomends',
  	'pizza',
  	'dessets',
  	'rols',
  	'hot rols',
  	'sushi',
  	'soups',
  	'salads',
  	'drinks',
  	'sets'
  ];

  public logo_path: string = '/assets/logo/Yakudza.svg';

  constructor() { }

  ngOnInit() {
  	console.log(Component);
  }

}
