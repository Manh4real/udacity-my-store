import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

export interface CheckoutForm {
  fullName: string;
  address: string;
  creditcard: string;
}

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.scss',
})
export class CheckoutFormComponent {
  @Output() submit = new EventEmitter<CheckoutForm>();

  form: CheckoutForm = {
    fullName: '',
    address: '',
    creditcard: '',
  };

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  onSubmitClick(ngForm: NgForm): void {
    if (!this.authService.user && !this.authService.getToken()) {
      this.router.navigate(['/login']);

      return;
    }

    const form = ngForm.form;

    form.markAllAsTouched();

    if (form.invalid) return;

    this.submit.emit(form.getRawValue());
  }
}
