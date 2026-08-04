import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ScrollSnapSection } from '../../shared/scroll-snap-section';

interface ApproachPoint {
  title: string;
  imageSrc?: string;
  imageAlt?: string;
}

@Component({
  selector: 'app-approach-section',
  imports: [RouterLink],
  templateUrl: './approach.html',
  styleUrl: './approach.scss',
})
export class ApproachSection extends ScrollSnapSection {
  protected readonly approachPoints: ApproachPoint[] = [
    { title: 'Evidence-based methods' },
    { title: 'Safe, supportive environment' },
    { title: 'Tailored sessions' },
  ];
}
