import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ScrollSnapSection } from '../../shared/scroll-snap-section';

interface ServiceOverview {
  title: string;
  description: string;
  linkLabel: string;
  path: string;
}

@Component({
  selector: 'app-services-directory',
  imports: [RouterLink],
  templateUrl: './directory.html',
  styleUrl: './directory.scss',
})
export class ServicesDirectory extends ScrollSnapSection {
  protected readonly services: ServiceOverview[] = [
    {
      title: 'Anxiety and Depression',
      description: 'Support for persistent worry, low mood, overwhelm, and feeling stuck.',
      linkLabel: 'Explore anxiety and depression therapy',
      path: '/services/depression-anxiety',
    },
    {
      title: 'Body Image and Eating Concerns',
      description: 'Build a more compassionate relationship with your body, food, and yourself.',
      linkLabel: 'Explore body image and eating concerns therapy',
      path: '/services/body-image-eating-disorder',
    },
    {
      title: 'Life Transitions',
      description: 'Find steadiness and clarity during periods of change and uncertainty.',
      linkLabel: 'Explore therapy for life transitions',
      path: '/services/life-transitions',
    },
    {
      title: 'Racism and Immigrant Experience',
      description: 'Culturally responsive support for identity, belonging, and lived experience.',
      linkLabel: 'Explore therapy for racism and immigrant experiences',
      path: '/services/racism-immigrant-experience',
    },
    {
      title: 'Trauma and PTSD',
      description: 'A supportive space to process painful experiences and reconnect with yourself.',
      linkLabel: 'Explore trauma and PTSD therapy',
      path: '/services/trauma-ptsd',
    },
    {
      title: 'Communication and Self Esteem',
      description: 'Strengthen your voice, relationships, boundaries, and sense of self.',
      linkLabel: 'Explore communication and self esteem therapy',
      path: '/services/communication-self-esteem',
    },
  ];
}
