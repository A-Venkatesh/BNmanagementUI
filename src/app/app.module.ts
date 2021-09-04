import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { NoPageFoundComponent } from './Components/no-page-found/no-page-found.component';
import { AngularMaterialModule } from './Modules/angular-material.module';
import { OrdersListComponent } from './Components/orders-list/orders-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PrimengMaterialModule } from './Modules/primeng-material.module';
import { OrderDetailComponent } from './Components/order-detail/order-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    NoPageFoundComponent,
    OrdersListComponent,
    OrderDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    PrimengMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    NgbModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
