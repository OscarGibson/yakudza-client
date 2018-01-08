import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  public shares_path: string = 'assets/img/shares.jpg';

  constructor() { }

  ngOnInit() {
  }

}
