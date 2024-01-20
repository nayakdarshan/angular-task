import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
// import { NavbarComponent } from '../shared/navbar/navbar.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    // NavbarComponent
  ]
})
export class HomeModule { }
