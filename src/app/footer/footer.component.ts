import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public images_path = {
  	'visa' : 'assets/img/visa.jpg',
  	'visae' : 'assets/img/visae.jpg',
  	'mc' : 'assets/img/mc.jpg'
  };

  constructor() { }

  ngOnInit() {
  }

}
