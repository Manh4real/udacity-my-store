import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RouteConstants } from '../constants/route';
import { Product } from '../models/product';

interface CreateOrderBody {
  products: Product[];
}
interface CreateOrderResponse {
  order: {
    order_id: number;
    status: 'active' | 'complete';
    user_id: number;
  };
  orderProducts: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly path = RouteConstants.API_BASE_URL;

  constructor(private readonly httpClient: HttpClient) {}

  createOrder$(body: CreateOrderBody): Observable<CreateOrderResponse> {
    return this.httpClient.post<CreateOrderResponse>(
      `${this.path}/orders`,
      body.products
    );
  }
}
