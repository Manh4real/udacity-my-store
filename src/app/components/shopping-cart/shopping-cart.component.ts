import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../models/product';
import { map } from 'rxjs';
import { CheckoutForm } from '../checkout-form/checkout-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent implements OnInit {
  total = 0;

  constructor(
    private readonly router: Router,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$
      .pipe(
        map((cart) => {
          return cart.reduce((acc, p) => acc + p.quantity * p.price, 0);
        })
      )
      .subscribe((total) => {
        this.total = total;
      });
  }

  get cart(): Product[] {
    return this.cartService.cart;
  }

  onQuantityChange(_quantity: number, product: Product): void {
    const quantity = Number(_quantity);

    this.cartService.updateCart(product, { quantity });
  }

  onCheckoutSubmit(checkoutForm: CheckoutForm): void {
    this.router.navigate(['/order-confirmation'], {
      queryParams: {
        q: btoa(
          encodeURIComponent(
            JSON.stringify({
              checkoutInfo: checkoutForm,
              total: this.total,
            })
          )
        ),
      },
    });
  }
}
