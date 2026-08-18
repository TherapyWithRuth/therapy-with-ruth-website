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
    data: {
      seo: {
        description:
          'Compassionate online therapy for anxiety, trauma, depression, body image, and relationship concerns with Ruth Perez Acosta, LMHC, across New York.',
        canonicalPath: '/',
        image: '/images/orange-flowers-in-tree.jpg',
        imageAlt: 'Orange flowers blooming in a tree',
      },
    },
    loadComponent: () => import('./home/home').then((component) => component.Home),
  },
  {
    path: 'about',
    title: 'About Ruth Perez Acosta, LMHC | Therapy with Ruth',
    data: {
      seo: {
        description:
          'Meet Ruth Perez Acosta, LMHC, an Afro Latina New York therapist offering culturally responsive, trauma informed online therapy grounded in curiosity and trust.',
        canonicalPath: '/about/',
        image: '/images/ruth-and-ramona-the-dog.jpg',
        imageAlt: 'Ruth Perez Acosta with her dog Ramona',
      },
    },
    loadComponent: () => import('./about/about').then((component) => component.About),
  },
  {
    path: 'services',
    title: 'Online Therapy Services in New York | Therapy with Ruth',
    data: {
      seo: {
        description:
          'Explore online therapy in New York for anxiety, depression, trauma, body image, life transitions, relationships, and immigrant experiences.',
        canonicalPath: '/services/',
        image: '/images/new-york-across-the-hudson.jpeg',
        imageAlt: 'New York City viewed across the Hudson River',
      },
    },
    loadComponent: () => import('./services/services').then((component) => component.ServicesPage),
  },
  {
    path: 'services/depression-anxiety',
    title: 'Anxiety and Depression Therapy in New York | Therapy with Ruth',
    data: {
      service: anxietyAndDepression,
      seo: {
        description:
          'Online therapy for anxiety and depression in New York to help you understand patterns, develop practical coping tools, and move forward with greater self trust.',
        canonicalPath: '/services/depression-anxiety/',
        image: '/images/new-york-across-the-hudson.jpeg',
        imageAlt: 'New York City viewed across the Hudson River',
        breadcrumbLabel: 'Anxiety and Depression',
      },
    },
    loadComponent: () =>
      import('./services/service-detail/service-detail').then(
        (component) => component.ServiceDetailPage,
      ),
  },
  {
    path: 'services/body-image-eating-disorder',
    title: 'Body Image and Eating Concerns Therapy in New York | Therapy with Ruth',
    data: {
      service: bodyImageAndEatingConcerns,
      seo: {
        description:
          'Compassionate online therapy for body image and eating concerns in New York, focused on reducing shame and building a more supportive relationship with yourself.',
        canonicalPath: '/services/body-image-eating-disorder/',
        image: '/images/new-york-across-the-hudson.jpeg',
        imageAlt: 'New York City viewed across the Hudson River',
        breadcrumbLabel: 'Body Image and Eating Concerns',
      },
    },
    loadComponent: () =>
      import('./services/service-detail/service-detail').then(
        (component) => component.ServiceDetailPage,
      ),
  },
  {
    path: 'services/life-transitions',
    title: 'Life Transitions Therapy in New York | Therapy with Ruth',
    data: {
      service: lifeTransitions,
      seo: {
        description:
          'Online therapy for life transitions in New York, offering grounded support through identity shifts, relationship changes, career decisions, grief, and uncertainty.',
        canonicalPath: '/services/life-transitions/',
        image: '/images/new-york-across-the-hudson.jpeg',
        imageAlt: 'New York City viewed across the Hudson River',
        breadcrumbLabel: 'Life Transitions',
      },
    },
    loadComponent: () =>
      import('./services/service-detail/service-detail').then(
        (component) => component.ServiceDetailPage,
      ),
  },
  {
    path: 'services/racism-immigrant-experience',
    title: 'Therapy for Racism and Immigrant Experiences in New York | Therapy with Ruth',
    data: {
      service: racismAndImmigrantExperience,
      seo: {
        description:
          'Culturally responsive online therapy in New York for the impact of racism, oppression, migration, cultural expectations, and immigrant experiences.',
        canonicalPath: '/services/racism-immigrant-experience/',
        image: '/images/new-york-across-the-hudson.jpeg',
        imageAlt: 'New York City viewed across the Hudson River',
        breadcrumbLabel: 'Racism and Immigrant Experiences',
      },
    },
    loadComponent: () =>
      import('./services/service-detail/service-detail').then(
        (component) => component.ServiceDetailPage,
      ),
  },
  {
    path: 'services/trauma-ptsd',
    title: 'Trauma and PTSD Therapy in New York | Therapy with Ruth',
    data: {
      service: traumaAndPtsd,
      seo: {
        description:
          'Trauma informed online therapy and EMDR for adults in New York, supporting healing from trauma and PTSD at a pace that respects safety and trust.',
        canonicalPath: '/services/trauma-ptsd/',
        image: '/images/new-york-across-the-hudson.jpeg',
        imageAlt: 'New York City viewed across the Hudson River',
        breadcrumbLabel: 'Trauma and PTSD',
      },
    },
    loadComponent: () =>
      import('./services/service-detail/service-detail').then(
        (component) => component.ServiceDetailPage,
      ),
  },
  {
    path: 'services/communication-self-esteem',
    title: 'Communication and Self Esteem Therapy in New York | Therapy with Ruth',
    data: {
      service: communicationAndSelfEsteem,
      seo: {
        description:
          'Online therapy in New York for communication, relationships, and self esteem, helping you express your needs, strengthen boundaries, and build self trust.',
        canonicalPath: '/services/communication-self-esteem/',
        image: '/images/new-york-across-the-hudson.jpeg',
        imageAlt: 'New York City viewed across the Hudson River',
        breadcrumbLabel: 'Communication and Self Esteem',
      },
    },
    loadComponent: () =>
      import('./services/service-detail/service-detail').then(
        (component) => component.ServiceDetailPage,
      ),
  },
  {
    path: 'contact',
    title: 'Contact Ruth Perez Acosta, LMHC | Therapy with Ruth',
    data: {
      seo: {
        description:
          'Schedule a 15 minute consultation with Ruth Perez Acosta, LMHC, for compassionate online therapy available throughout New York.',
        canonicalPath: '/contact/',
        image: '/images/cliffside-lima.jpeg',
        imageAlt: 'Cliffside overlooking the Pacific coast in Lima',
      },
    },
    loadComponent: () => import('./contact/contact').then((component) => component.ContactPage),
  },
  {
    path: 'faq',
    title: 'Therapy FAQs | Therapy with Ruth',
    data: {
      seo: {
        description:
          'Find answers about online therapy with Ruth Perez Acosta, LMHC, including sessions, confidentiality, reimbursement, licensing, and getting started.',
        canonicalPath: '/faq/',
        image: '/images/orange-flowers-in-tree.jpg',
        imageAlt: 'Orange flowers blooming in a tree',
      },
    },
    loadComponent: () => import('./faq/faq').then((component) => component.FaqPage),
  },
  {
    path: 'blog',
    title: 'Therapy Blog and Mental Health Resources | Therapy with Ruth',
    data: {
      seo: {
        description:
          'Reflections and practical guidance for navigating anxiety, relationships, identity, and meaningful personal growth.',
        canonicalPath: '/blog/',
        image: '/images/cliffside-lima.jpeg',
        imageAlt: 'Cliffside overlooking the Pacific coast in Lima',
      },
    },
    loadComponent: () => import('./blog/blog').then((component) => component.BlogPage),
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./blog/article/article').then((component) => component.BlogArticlePage),
  },
];
