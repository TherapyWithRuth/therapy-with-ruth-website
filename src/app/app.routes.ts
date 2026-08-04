import { Routes } from '@angular/router';

import {
  anxietyAndDepression,
  bodyImageAndEatingConcerns,
  communicationAndSelfEsteem,
  lifeTransitions,
  racismAndImmigrantExperience,
  traumaAndPtsd,
} from './services/service-detail/service-content';

export const routes: Routes = [
  {
    path: '',
    title: 'Therapy for Anxiety, Trauma & Depression in New York | Therapy with Ruth',
    loadComponent: () => import('./home/home').then((component) => component.Home),
  },
  {
    path: 'about',
    title: 'About Ruth Perez Acosta, LMHC | Therapy with Ruth',
    loadComponent: () => import('./about/about').then((component) => component.About),
  },
  {
    path: 'services',
    title: 'Online Therapy Services in New York | Therapy with Ruth',
    loadComponent: () => import('./services/services').then((component) => component.ServicesPage),
  },
  {
    path: 'services/depression-anxiety',
    title: 'Anxiety and Depression Therapy in New York | Therapy with Ruth',
    data: { service: anxietyAndDepression },
    loadComponent: () =>
      import('./services/service-detail/service-detail').then(
        (component) => component.ServiceDetailPage,
      ),
  },
  {
    path: 'services/body-image-eating-disorder',
    title: 'Body Image and Eating Concerns Therapy in New York | Therapy with Ruth',
    data: { service: bodyImageAndEatingConcerns },
    loadComponent: () =>
      import('./services/service-detail/service-detail').then(
        (component) => component.ServiceDetailPage,
      ),
  },
  {
    path: 'services/life-transitions',
    title: 'Life Transitions Therapy in New York | Therapy with Ruth',
    data: { service: lifeTransitions },
    loadComponent: () =>
      import('./services/service-detail/service-detail').then(
        (component) => component.ServiceDetailPage,
      ),
  },
  {
    path: 'services/racism-immigrant-experience',
    title: 'Therapy for Racism and Immigrant Experiences in New York | Therapy with Ruth',
    data: { service: racismAndImmigrantExperience },
    loadComponent: () =>
      import('./services/service-detail/service-detail').then(
        (component) => component.ServiceDetailPage,
      ),
  },
  {
    path: 'services/trauma-ptsd',
    title: 'Trauma and PTSD Therapy in New York | Therapy with Ruth',
    data: { service: traumaAndPtsd },
    loadComponent: () =>
      import('./services/service-detail/service-detail').then(
        (component) => component.ServiceDetailPage,
      ),
  },
  {
    path: 'services/communication-self-esteem',
    title: 'Communication and Self Esteem Therapy in New York | Therapy with Ruth',
    data: { service: communicationAndSelfEsteem },
    loadComponent: () =>
      import('./services/service-detail/service-detail').then(
        (component) => component.ServiceDetailPage,
      ),
  },
];
