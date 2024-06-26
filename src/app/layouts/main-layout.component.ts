import { Component } from '@angular/core';

import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  template: `
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <div class="!w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <a
                routerLink="/"
                routerLinkActive="!text-blue-500"
                [routerLinkActiveOptions]="{ exact: true }"
                class="block text-white"
                >Product List</a
              >
            </li>
            <li>
              <a
                routerLink="/shopping-cart"
                routerLinkActive="!text-blue-500"
                [routerLinkActiveOptions]="{ exact: true }"
                class="block text-white"
              >
                Cart ({{ (cartService.cart$ | async)?.length }})
              </a>
            </li>
            <li class="!ml-auto" *ngIf="!authService.getToken()">
              <a routerLink="/login" class="block text-white"> Log in </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-outlet></router-outlet>
  `,
})
export class MainLayoutComponent {
  constructor(
    protected readonly authService: AuthService,
    protected readonly cartService: CartService
  ) {}
}
