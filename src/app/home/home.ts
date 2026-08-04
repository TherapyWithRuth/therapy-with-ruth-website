import { Component } from '@angular/core';

import { AboutSection } from './about/about';
import { ApproachSection } from './approach/approach';
import { FaqSection } from './faq/faq';
import { GettingStartedSection } from './getting-started/getting-started';
import { Hero } from './hero/hero';
import { LocationSection } from './location/location';
import { Problem } from './problem/problem';
import { ServicesSection } from './services/services';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    Problem,
    AboutSection,
    ServicesSection,
    ApproachSection,
    GettingStartedSection,
    FaqSection,
    LocationSection,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
