import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

export interface FaqItem {
  question: string;
  answer: string;
}

@Injectable({ providedIn: 'root' })
export class FaqDataService {
  private readonly http = inject(HttpClient);

  readonly faqItems$: Observable<FaqItem[]> = this.http
    .get<FaqItem[]>('/data/faqs.json')
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));
}
