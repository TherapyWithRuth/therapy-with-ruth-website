import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactPage {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);

  // Temporary test recipient. Replace this with Ruth's receiving email before launch.
  private readonly recipientEmail = 'therapywithruth@gmail.com';

  protected readonly submissionMessage = signal('');
  protected readonly contactForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    phone: ['', [Validators.pattern(/^[0-9+().\-\s]{7,25}$/)]],
    message: ['', [Validators.required, Validators.maxLength(2000)]],
  });

  constructor() {
    this.document.documentElement.classList.add('free-scroll');
    this.destroyRef.onDestroy(() => this.document.documentElement.classList.remove('free-scroll'));
  }

  protected submitForm(): void {
    this.submissionMessage.set('');
    this.contactForm.markAllAsTouched();

    if (this.contactForm.invalid) {
      return;
    }

    if (!this.recipientEmail) {
      this.submissionMessage.set(
        'Email delivery is not configured yet. Please use the Psychology Today profile to get in touch.',
      );
      return;
    }

    const { name, email, phone, message } = this.contactForm.getRawValue();
    const subject = encodeURIComponent(`Consultation request from ${name}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || 'Not provided'}`, '', message].join(
        '\n',
      ),
    );

    this.submissionMessage.set(
      'Your email application should open with your message ready to send.',
    );
    this.document.defaultView?.location.assign(
      `mailto:${this.recipientEmail}?subject=${subject}&body=${body}`,
    );
  }
}
