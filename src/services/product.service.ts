import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Product } from '../app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly path = 'http://localhost:3000';

  constructor(private readonly httpClient: HttpClient) {}

  getProductList$(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(`${this.path}/products`)
      .pipe(map((list) => list.map((p) => ({ ...p, quantity: 1 }))));
  }

  getProductById$(productId: string): Observable<Product | null> {
    return this.httpClient
      .get<Product | null>(`${this.path}/products/${productId}`)
      .pipe(map((p) => p && { ...p, quantity: 1 }));
  }
}
