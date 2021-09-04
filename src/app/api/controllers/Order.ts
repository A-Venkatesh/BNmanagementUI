/* tslint:disable:max-line-length */
/**
 * Api Documentation
 * 1.0
 * Api Documentation
 * urn:tos
 * Apache 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * localhost:8080
 */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import * as __model from '../model';

export interface ReleaseParams {
  /** id */
  id: string;
  /** razorpay_payment_id */
  razorpay_payment_id: string;
}

export interface StockParams {
  /** stockObjectList */
  stockObjectList: __model.StockObjectList;
}

export interface UpdateParams {
  /**
   * code
   * format: int32
   */
  code: number;
  /** id */
  id: string;
  /** updateDetails */
  updateDetails: __model.UpdateDetails;
}

export interface UserParams {
  /** id */
  id: string;
}

export interface GetOrderUsingGETParams {
  /** id */
  id: string;
}

export interface AddOrderUsingPOSTParams {
  /** invoice */
  invoice: string;
  /** order */
  order: __model.Order;
}

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}
  basePath ="http://localhost:8080";

  /**
   * getOrders
   * http://localhost:8080/swagger/swagger-ui.html#!/order-controller/getOrdersUsingGET
   */
  getOrdersUsingGET(): Observable<__model.Order[]> {
    return this.http.get<__model.Order[]>(this.basePath+`/api/orders`);
  }

  /**
   * releaseOrder
   * http://localhost:8080/swagger/swagger-ui.html#!/order-controller/releaseOrderUsingGET
   */
  release(params: ReleaseParams): Observable<__model.Order> {
    const pathParams = {
      id: params.id,
    };
    const queryParamBase = {
      razorpay_payment_id: params.razorpay_payment_id,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else if (Array.isArray(value)) value.forEach(v => queryParams = queryParams.append(key, v));
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    return this.http.get<__model.Order>(this.basePath+`/api/orders/release/${pathParams.id}`, {params: queryParams});
  }

  /**
   * updateStock
   * http://localhost:8080/swagger/swagger-ui.html#!/order-controller/updateStockUsingPOST
   */
  stock(params: StockParams): Observable<void> {
    const bodyParams = params.stockObjectList;

    return this.http.post<void>(`/api/orders/stock`, bodyParams || {});
  }

  /**
   * setOrderStatus
   * http://localhost:8080/swagger/swagger-ui.html#!/order-controller/setOrderStatusUsingPOST
   */
  update(params: UpdateParams): Observable<__model.Order> {
    const pathParams = {
      code: params.code,
      id: params.id,
    };
    const bodyParams = params.updateDetails;

    return this.http.post<__model.Order>(`/api/orders/update/${pathParams.id}/${pathParams.code}`, bodyParams || {});
  }

  /**
   * getOrdersByUserId
   * http://localhost:8080/swagger/swagger-ui.html#!/order-controller/getOrdersByUserIdUsingGET
   */
  user(params: UserParams): Observable<__model.Order[]> {
    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.Order[]>(`/api/orders/user/${pathParams.id}`);
  }

  /**
   * getOrder
   * http://localhost:8080/swagger/swagger-ui.html#!/order-controller/getOrderUsingGET
   */
  getOrderUsingGET(params: GetOrderUsingGETParams): Observable<__model.Order> {
    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.Order>(this.basePath+`/api/orders/${pathParams.id}`);
  }

  /**
   * addOrder
   * http://localhost:8080/swagger/swagger-ui.html#!/order-controller/addOrderUsingPOST
   */
  addOrderUsingPOST(params: AddOrderUsingPOSTParams): Observable<__model.Order> {
    const pathParams = {
      invoice: params.invoice,
    };
    const bodyParams = params.order;

    return this.http.post<__model.Order>(this.basePath+`/api/orders/${pathParams.invoice}`, bodyParams || {});
  }
}
