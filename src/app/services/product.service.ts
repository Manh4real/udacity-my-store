import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Product } from '../models/product';
import { IGNORE_AUTH, RouteConstants } from '../constants/route';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly path = RouteConstants.API_BASE_URL;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}

  getMutualHttpContext(): HttpContext {
    return new HttpContext().set(IGNORE_AUTH, !this.authService.user);
  }

  getProductList$(): Observable<Product[]> {
    const context = this.getMutualHttpContext();

    return this.httpClient
      .get<Product[]>(`${this.path}/products`, { context })
      .pipe(map((list) => list.map((p) => ({ ...p, quantity: 1 }))));
  }

  getProductById$(productId: string): Observable<Product | null> {
    const context = this.getMutualHttpContext();

    return this.httpClient
      .get<Product | null>(`${this.path}/products/${productId}`, { context })
      .pipe(map((p) => p && { ...p, quantity: 1 }));
  }
}
