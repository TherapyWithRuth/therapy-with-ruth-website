import { isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import {
  escapeHTML,
  toHTML,
  uriLooksSafe,
  type PortableTextComponents,
} from '@portabletext/to-html';

import type { BlogImage, BlogPost, BlogPostSummary } from './blog.types';

export const SANITY_PROJECT_ID = 'we0166yc';
export const SANITY_DATASET = 'production';
export const SANITY_API_VERSION = '2026-03-01';

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
  perspective: 'published',
});

const imageBuilder = createImageUrlBuilder(sanityClient);

const postSummaryProjection = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  author,
  publishedAt,
  mainImage {
    ...,
    asset,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }
`;

const allPostsQuery = `
  *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ] | order(publishedAt desc) {
    ${postSummaryProjection}
  }
`;

const postBySlugQuery = `
  *[
    _type == "post" &&
    slug.current == $slug &&
    defined(publishedAt) &&
    publishedAt <= now()
  ][0] {
    ${postSummaryProjection},
    body,
    seoTitle,
    seoDescription
  }
`;

const publishedPostSlugsQuery = `
  *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    publishedAt <= now()
  ].slug.current
`;

@Injectable({ providedIn: 'root' })
export class SanityBlogService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly client = isPlatformServer(this.platformId)
    ? sanityClient.withConfig({ useCdn: false })
    : sanityClient;

  getPosts(): Promise<BlogPostSummary[]> {
    return this.client.fetch<BlogPostSummary[]>(allPostsQuery);
  }

  getPost(slug: string): Promise<BlogPost | null> {
    return this.client.fetch<BlogPost | null>(postBySlugQuery, { slug });
  }

  getPostSlugs(): Promise<string[]> {
    return this.client.fetch<string[]>(publishedPostSlugsQuery);
  }

  imageUrl(image: BlogImage, width: number, height?: number): string {
    let url = imageBuilder.image(image as SanityImageSource).width(width).auto('format').quality(85);

    if (height) {
      url = url.height(height).fit('crop');
    }

    return url.url();
  }

  renderArticle(post: BlogPost): string {
    const components: PortableTextComponents = {
      types: {
        articleImage: ({ value }) => {
          const image = value as BlogImage;
          const src = this.imageUrl(image, 1200);
          const caption = image.caption
            ? `<figcaption>${escapeHTML(image.caption)}</figcaption>`
            : '';

          return `<figure><img src="${escapeHTML(src)}" alt="${escapeHTML(image.alt)}" loading="lazy" decoding="async">${caption}</figure>`;
        },
      },
      marks: {
        link: ({ children, value }) => {
          const href = typeof value?.['href'] === 'string' ? value['href'] : '';

          if (!uriLooksSafe(href)) {
            return children;
          }

          const externalAttributes = href.startsWith('/')
            ? ''
            : ' target="_blank" rel="noreferrer noopener"';

          return `<a href="${escapeHTML(href)}"${externalAttributes}>${children}</a>`;
        },
      },
    };

    return toHTML(post.body, { components });
  }
}
