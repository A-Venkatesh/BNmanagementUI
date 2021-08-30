import { Injectable } from '@angular/core';
import { Order } from '../api/model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 orders: Array<Order>

  constructor() {
    this.orders =[];
   }
}
