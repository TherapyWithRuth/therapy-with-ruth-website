import { Component } from '@angular/core';

import { ServicesCta } from './cta/cta';
import { ServicesDirectory } from './directory/directory';
import { ServicesHero } from './hero/hero';

@Component({
  selector: 'app-services-page',
  imports: [ServicesHero, ServicesDirectory, ServicesCta],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class ServicesPage {}
