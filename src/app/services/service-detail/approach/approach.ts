import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ScrollSnapSection } from '../../../shared/scroll-snap-section';
import { ServicePageContent } from '../service-content';

@Component({
  selector: 'app-service-approach',
  imports: [RouterLink],
  templateUrl: './approach.html',
  styleUrl: './approach.scss',
})
export class ServiceApproach extends ScrollSnapSection {
  readonly service = input.required<ServicePageContent>();
}
