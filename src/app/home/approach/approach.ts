import { Component } from '@angular/core';

import { ScrollSnapSection } from '../../shared/scroll-snap-section';

interface ApproachPoint {
  title: string;
  imageSrc?: string;
  imageFallbackSrc?: string;
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
      imageSrc: '/images/myth-or-fact.webp',
      imageFallbackSrc: '/images/myth-or-fact.jpg',
      imageAlt: 'Yellow and blue notes labeled myths and facts',
      imageWidth: 1600,
      imageHeight: 1071,
    },
    {
      title: 'Safe, supportive environment',
      imageSrc: '/images/walking-arms-around-shoulders.webp',
      imageFallbackSrc: '/images/walking-arms-around-shoulders.jpg',
      imageAlt: 'Two women walking with their arms around each other',
      imageWidth: 1067,
      imageHeight: 1600,
    },
    {
      title: 'Tailored sessions',
      imageSrc: '/images/talking-on-bench.webp',
      imageFallbackSrc: '/images/talking-on-bench.jpg',
      imageAlt: 'Two women having a supportive conversation outdoors',
      imageWidth: 1600,
      imageHeight: 1066,
    },
  ];
}
