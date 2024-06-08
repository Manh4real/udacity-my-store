import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  onSubmitClick(ngForm: NgForm): void {
    const form = ngForm.form;

    form.markAllAsTouched();

    if (form.invalid) return;

    this.submit.emit(form.getRawValue());
  }
}
