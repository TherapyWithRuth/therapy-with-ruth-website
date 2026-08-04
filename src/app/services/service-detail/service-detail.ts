import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServiceApproach } from './approach/approach';
import { ServiceConcerns } from './concerns/concerns';
import { ServiceDetailHero } from './hero/hero';
import { ServicePageContent } from './service-content';

@Component({
  selector: 'app-service-detail',
  imports: [ServiceDetailHero, ServiceConcerns, ServiceApproach],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.scss',
})
export class ServiceDetailPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly service = this.route.snapshot.data['service'] as ServicePageContent;
}
