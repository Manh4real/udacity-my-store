import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly storageKey = 'cart';
  private readonly _cart$ = new BehaviorSubject<Product[]>([]);

  cart$ = this._cart$.asObservable();

  get cart(): Product[] {
    return this._cart$.getValue();
  }

  updateCart(product: Product, updated: Partial<Product>): void {
    // NOTE: product updated by REFERENCE
    const addedProduct = this.cart.find(
      (p) => String(p.product_id) === String(product.product_id)
    );

    if (!addedProduct) return;

    Object.keys(updated).forEach((_key) => {
      const key = _key as keyof Product;
      const updatedValue = updated[key];

      if (updatedValue !== undefined) {
        addedProduct[key] = updatedValue;
      }
    });

    this._cart$.next(this.cart);
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
  }

  addToCart(product: Product): void {
    // NOTE: product updated by REFERENCE
    product.quantity = Number(product.quantity);

    const addedProduct = this.cart.find(
      (p) => String(p.product_id) === String(product.product_id)
    );

    if (addedProduct) {
      addedProduct.quantity =
        Number(addedProduct.quantity) + Number(product.quantity);
    }

    const saved = addedProduct
      ? this.cart
      : this.cart.concat(Object.assign({}, product));

    this._cart$.next(saved);
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));

    alert('Added to cart');
  }

  getCartFromStorage(): void {
    const products =
      JSON.parse(localStorage.getItem(this.storageKey) as any) || [];

    this._cart$.next(products);
  }
}
