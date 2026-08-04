import { Component } from '@angular/core';

import { AboutSection } from './about/about';
import { ApproachSection } from './approach/approach';
import { Hero } from './hero/hero';
import { Problem } from './problem/problem';
import { ServicesSection } from './services/services';

@Component({
  selector: 'app-home',
  imports: [Hero, Problem, AboutSection, ServicesSection, ApproachSection],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
