import { Component } from '@angular/core';

import { ScrollSnapSection } from '../../shared/scroll-snap-section';

interface ApproachPoint {
  title: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

@Component({
  selector: 'app-approach-section',
  templateUrl: './approach.html',
  styleUrl: './approach.scss',
})
export class ApproachSection extends ScrollSnapSection {
  protected readonly approachPoints: ApproachPoint[] = [
    {
      title: 'Evidence-based methods',
      imageSrc: '/images/myth-or-fact.jpg',
      imageAlt: 'Yellow and blue notes labeled myths and facts',
      imageWidth: 2048,
      imageHeight: 1371,
    },
    {
      title: 'Safe, supportive environment',
      imageSrc: '/images/walking-arms-with-around-shoulders.jpg',
      imageAlt: 'Two women walking with their arms around each other',
      imageWidth: 1366,
      imageHeight: 2048,
    },
    {
      title: 'Tailored sessions',
      imageSrc: '/images/discussion.jpg',
      imageAlt: 'Two women having a supportive conversation outdoors',
      imageWidth: 2048,
      imageHeight: 1366,
    },
  ];
}
