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

export interface Order {
  awb?: string;
  coupon?: string;
  couponApplied?: boolean;
  courierName?: string;
  data?: any;
  /** format: float */
  discountedPrice?: number;
  id?: string;
  invoice?: any;
  line_items?: any;
  method?: string;
  mode?: string;
  /** format: date-time */
  postedOn?: string;
  razorpay_payment_id?: string;
  shippingAddress?: {[key: string]: string};
  /** format: int32 */
  shippingFees?: number;
  status?: StatusOrderEnum;
  stockObject?: any;
  userDetails?: any;
  userId?: string;
}

export type StatusOrderEnum =
  'DISPACHED' |
  'RECEIVED' |
  'SHIPPED';
