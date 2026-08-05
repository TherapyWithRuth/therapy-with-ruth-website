import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

import { FaqDataService } from '../shared/faq-data.service';

@Component({
  selector: 'app-faq-page',
  imports: [AsyncPipe, MatExpansionModule, RouterLink],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class FaqPage {
  private readonly faqData = inject(FaqDataService);

  protected readonly faqItems$ = this.faqData.faqItems$.pipe(catchError(() => of([])));
}
