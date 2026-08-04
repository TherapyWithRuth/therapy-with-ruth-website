import { Component } from '@angular/core';

import { AboutSection } from './about/about';
import { Hero } from './hero/hero';
import { Problem } from './problem/problem';

@Component({
  selector: 'app-home',
  imports: [Hero, Problem, AboutSection],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
