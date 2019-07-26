import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {MainService} from './main.service';
import { LibraryComponent } from './library/library.component';

@NgModule({
  declarations: [MainComponent, LibraryComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [MainService]
})

export class MainModule { }
