import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ScrollSnapSection } from '../../shared/scroll-snap-section';

interface ServiceCard {
  title: string;
  path: string;
}

@Component({
  selector: 'app-services-section',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class ServicesSection extends ScrollSnapSection {
  protected readonly services: ServiceCard[] = [
    { title: 'Anxiety & Depression', path: '/services/depression-anxiety' },
    { title: 'Body Image', path: '/services/body-image-eating-disorder' },
    { title: 'Life Transitions', path: '/services/life-transitions' },
    { title: 'Immigrant Experience', path: '/services/racism-immigrant-experience' },
  ];
}
