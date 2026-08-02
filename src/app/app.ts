import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuBar } from './shared/components/menu-bar/menu-bar';

@Component({
  selector: 'app-root',
  imports: [MenuBar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
