import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { HttpClientModule } from '@angular/common/http';

import { PhoneFormatPipe, NumberFormatPipe } from './body/body.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    PhoneFormatPipe,
    NumberFormatPipe
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
