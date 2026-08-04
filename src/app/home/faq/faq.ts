import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ScrollSnapSection } from '../../shared/scroll-snap-section';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-section',
  imports: [RouterLink],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class FaqSection extends ScrollSnapSection {
  protected readonly faqItems: FaqItem[] = [
    {
      question: 'How many years of experience do you have as a therapist?',
      answer: 'I have been working professionally as a therapist since 2012.',
    },
    {
      question: 'What insurance do you accept?',
      answer:
        "While I don't accept insurance directly, most providers will reimburse you for my services.",
    },
  ];
}
