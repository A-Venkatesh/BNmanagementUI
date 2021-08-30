import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { NoPageFoundComponent } from './Components/no-page-found/no-page-found.component';
import { AngularMaterialModule } from './Modules/angular-material.module';
import { OrdersListComponent } from './Components/orders-list/orders-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    NoPageFoundComponent,
    OrdersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
