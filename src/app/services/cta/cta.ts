import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ScrollSnapSection } from '../../shared/scroll-snap-section';

@Component({
  selector: 'app-services-cta',
  imports: [RouterLink],
  templateUrl: './cta.html',
  styleUrl: './cta.scss',
})
export class ServicesCta extends ScrollSnapSection {}
