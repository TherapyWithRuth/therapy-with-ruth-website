import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuBar } from './shared/components/menu-bar/menu-bar';
import { SiteFooter } from './shared/components/site-footer/site-footer';
import { SeoService } from './shared/seo.service';

@Component({
  selector: 'app-root',
  imports: [MenuBar, RouterOutlet, SiteFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    inject(SeoService);
  }
}
