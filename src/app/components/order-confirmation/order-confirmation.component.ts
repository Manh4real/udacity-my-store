import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CheckoutForm } from '../checkout-form/checkout-form.component';

interface OrderInfo {
  checkoutInfo: CheckoutForm;
  total: number;
}

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss',
})
export class OrderConfirmationComponent implements OnInit {
  orderInfo?: OrderInfo;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ q }) => {
      try {
        const info = JSON.parse(decodeURIComponent(atob(q)));

        if (!info) {
          this.router.navigate(['/']);
          return;
        }

        this.orderInfo = info;
      } catch (err) {
        this.router.navigate(['/']);
      }
    });
  }
}
