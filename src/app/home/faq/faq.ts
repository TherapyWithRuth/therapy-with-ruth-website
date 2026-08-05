import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { FaqDataService } from '../../shared/faq-data.service';
import { ScrollSnapSection } from '../../shared/scroll-snap-section';

@Component({
  selector: 'app-faq-section',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class FaqSection extends ScrollSnapSection {
  private readonly faqData = inject(FaqDataService);

  protected readonly faqItems$ = this.faqData.faqItems$.pipe(
    map((items) => items.slice(0, 2)),
    catchError(() => of([])),
  );
}
