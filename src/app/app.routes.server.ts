import { inject } from '@angular/core';
import { PrerenderFallback, RenderMode, type ServerRoute } from '@angular/ssr';

import { SanityBlogService } from './blog/sanity-blog.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    async getPrerenderParams() {
      const blogService = inject(SanityBlogService);
      const slugs = await blogService.getPostSlugs();

      return slugs.map((slug) => ({ slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
