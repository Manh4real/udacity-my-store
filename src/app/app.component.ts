import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(protected readonly cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartFromStorage();
  }
}
