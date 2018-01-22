import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  public shares_path: string = 'assets/img/shares.jpg';
  public product_path: string = 'assets/img/havka.jpg';
  public shares_2_path: string = 'assets/img/shares_image.jpg';

  public document_image: string = 'assets/img/document.jpg';

  public how_to_icon: string = 'assets/img/howToIcon.png';

  public logo_path: string = '/assets/logo/Yakudza.svg';

  constructor() { }

  ngOnInit() {
  }

}
