import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {APP_CONFIG, AppConfig, APP_BREAKPOINTS, API_URL, ApiUrl} from './app.config';
import {SharedModule} from './shared/shared.module';
import {BookModule} from './book/book.module';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoadingInterceptor} from './book/loading.interceptor';
import {ErrorComponent} from './error/error.component';
import {ServerErrorInterceptor} from './server-error.interceptor';
import {ServerNameInterceptor} from './server-name.interceptor';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SharedModule,
    BookModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: ServerNameInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true},
    {provide: APP_BREAKPOINTS, useValue: AppConfig.breakPoints},
    {provide: API_URL, useValue: ApiUrl},
    {provide: APP_CONFIG, useValue: AppConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
