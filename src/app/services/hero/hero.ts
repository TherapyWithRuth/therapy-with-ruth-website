import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ScrollSnapSection } from '../../shared/scroll-snap-section';

@Component({
  selector: 'app-services-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class ServicesHero extends ScrollSnapSection {}
