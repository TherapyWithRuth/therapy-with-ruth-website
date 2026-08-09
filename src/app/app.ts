import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuBar } from './shared/components/menu-bar/menu-bar';
import { SiteFooter } from './shared/components/site-footer/site-footer';

@Component({
  selector: 'app-root',
  imports: [MenuBar, RouterOutlet, SiteFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
