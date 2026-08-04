import { Routes } from '@angular/router';

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
];
