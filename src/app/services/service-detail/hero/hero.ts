import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ScrollSnapSection } from '../../../shared/scroll-snap-section';
import { ServicePageContent } from '../service-content';

@Component({
  selector: 'app-service-detail-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class ServiceDetailHero extends ScrollSnapSection {
  readonly service = input.required<ServicePageContent>();
}
