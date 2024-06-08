import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input({ required: true }) product!: Product;

  constructor(private readonly cartService: CartService) {}

  onAddToCartClick(): void {
    this.cartService.addToCart(this.product);
  }
}
