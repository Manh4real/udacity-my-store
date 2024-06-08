import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/product';
import { ProductService } from '../../../services/product.service';
import { LoadingService } from '../../../services/loading.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product: Product | null = null;

  get loading(): boolean {
    return this.loadingService.isLoading();
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly loadingService: LoadingService,
    private readonly productService: ProductService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'] || '';

    this.productService.getProductById$(productId).subscribe((data) => {
      this.product = data;
    });
  }

  onAddToCartClick(): void {
    if (!this.product) return;

    this.cartService.addToCart(this.product);
  }
}
