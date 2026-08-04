import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ScrollSnapSection } from '../../shared/scroll-snap-section';

@Component({
  selector: 'app-location-section',
  imports: [RouterLink],
  templateUrl: './location.html',
  styleUrl: './location.scss',
})
export class LocationSection extends ScrollSnapSection {}
