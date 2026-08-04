import { Component } from '@angular/core';

import { ScrollSnapSection } from '../../shared/scroll-snap-section';

@Component({
  selector: 'app-getting-started-section',
  templateUrl: './getting-started.html',
  styleUrl: './getting-started.scss',
})
export class GettingStartedSection extends ScrollSnapSection {
  protected readonly steps = [
    'Schedule a consultation',
    'Meet for your first session',
    'Begin your therapy journey',
  ];
}
