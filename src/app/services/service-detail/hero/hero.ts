import { Component, input } from '@angular/core';

import { ScrollSnapSection } from '../../../shared/scroll-snap-section';
import { ServicePageContent } from '../service-content';

@Component({
  selector: 'app-service-detail-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class ServiceDetailHero extends ScrollSnapSection {
  readonly service = input.required<ServicePageContent>();
}
