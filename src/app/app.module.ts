import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {API_ENDPOINT, AppConfig} from './app.config';

import {SharedModule} from './shared/shared.module';
import {BookModule} from './book/book.module';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    BookModule,
    AppRoutingModule
  ],
  providers: [
    {provide: API_ENDPOINT, useValue: AppConfig.apiEndpoint}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
