import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ScrollSnapSection } from '../../shared/scroll-snap-section';

@Component({
  selector: 'app-about-section',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutSection extends ScrollSnapSection {}
