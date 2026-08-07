import { Component } from '@angular/core';

import { ScrollSnapSection } from '../../shared/scroll-snap-section';

@Component({
  selector: 'app-getting-started-section',
  templateUrl: './getting-started.html',
  styleUrl: './getting-started.scss',
})
export class GettingStartedSection extends ScrollSnapSection {
  protected readonly focusAreas = [
    'Move beyond understanding a pattern toward changing it',
    'Explore what continues to feel unresolved or repetitive',
    'Strengthen self-trust and live with greater intention',
  ];
}
