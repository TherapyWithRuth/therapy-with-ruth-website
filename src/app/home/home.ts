import { Component } from '@angular/core';

import { AboutSection } from './about/about';
import { Hero } from './hero/hero';
import { Problem } from './problem/problem';
import { ServicesSection } from './services/services';

@Component({
  selector: 'app-home',
  imports: [Hero, Problem, AboutSection, ServicesSection],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
