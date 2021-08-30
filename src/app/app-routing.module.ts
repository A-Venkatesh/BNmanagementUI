import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { NoPageFoundComponent } from './Components/no-page-found/no-page-found.component';
import { OrdersListComponent } from './Components/orders-list/orders-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/order', pathMatch: 'full' },
  { path: 'add', component: AddProductComponent },
  { path: 'order', component: OrdersListComponent },

  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
