import { Component, OnInit } from '@angular/core';

import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    protected readonly cartService: CartService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartFromStorage();
    this.authService.getTokenFromStorage();
  }
}
