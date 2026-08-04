import { Component, input } from '@angular/core';

import { ScrollSnapSection } from '../../../shared/scroll-snap-section';
import { ServicePageContent } from '../service-content';

@Component({
  selector: 'app-service-concerns',
  templateUrl: './concerns.html',
  styleUrl: './concerns.scss',
})
export class ServiceConcerns extends ScrollSnapSection {
  readonly service = input.required<ServicePageContent>();
}
