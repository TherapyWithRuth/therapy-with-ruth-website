import { Component } from '@angular/core';

import { Hero } from './hero/hero';
import { Problem } from './problem/problem';

@Component({
  selector: 'app-home',
  imports: [Hero, Problem],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
