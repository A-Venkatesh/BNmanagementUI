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

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import * as __model from '../model';

export interface PdfParams {
  /** order */
  order: __model.Order;
}

export interface BatchParams {
  /** orders */
  orders: __model.Order[];
}

@Injectable()
export class PdfService {
  basePath ="http://localhost:8080";
  constructor(private http: HttpClient) {}

  /**
   * getPdf
   * http://localhost:8080/swagger/swagger-ui.html#!/pdf-controller/getPdfUsingPUT
   */
  pdf(params: PdfParams): Observable<any> {
    const bodyParams = params.order;

    return this.http.put(this.basePath +`/api/pdf`, bodyParams || {}, { responseType: 'blob' });
  }

  /**
   * getPdfs
   * http://localhost:8080/swagger/swagger-ui.html#!/pdf-controller/getPdfsUsingPUT
   */
  batch(params: BatchParams): Observable<any> {
    const bodyParams = params.orders;

    return this.http.put(this.basePath +`/api/pdf/batch`, bodyParams || {},  { responseType: 'blob' });
  }
}
