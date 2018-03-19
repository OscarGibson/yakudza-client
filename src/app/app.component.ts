import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AppReady } from './app.globals';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Yakuza';

  logo_path: string = '/assets/logo/Yakudza.svg';

  app_ready_checker = AppReady;
}
