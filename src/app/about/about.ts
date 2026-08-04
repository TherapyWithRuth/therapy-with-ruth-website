import { Component } from '@angular/core';

import { AboutApproach } from './approach/approach';
import { AboutCta } from './cta/cta';
import { FindMe } from './find-me/find-me';
import { AboutHero } from './hero/hero';
import { ProfessionalBackground } from './professional-background/professional-background';
import { WhoIHelp } from './who-i-help/who-i-help';
import { WhatToExpect } from './what-to-expect/what-to-expect';

@Component({
  selector: 'app-about',
  imports: [
    AboutHero,
    ProfessionalBackground,
    AboutApproach,
    WhoIHelp,
    WhatToExpect,
    FindMe,
    AboutCta,
  ],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
