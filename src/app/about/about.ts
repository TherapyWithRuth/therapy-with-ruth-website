import { Component } from '@angular/core';

import { AboutHero } from './hero/hero';

@Component({
  selector: 'app-about',
  imports: [AboutHero],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
