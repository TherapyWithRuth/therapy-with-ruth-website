import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

const SITE_ORIGIN = 'https://therapywithruth.com';
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const RUTH_ID = `${SITE_ORIGIN}/about/#ruth-perez-acosta`;
const PSYCHOLOGY_TODAY_URL =
  'https://www.psychologytoday.com/us/therapists/ruth-perez-acosta-new-york-ny/483314';
const STRUCTURED_DATA_ID = 'page-structured-data';

interface StaticPageData {
  canonicalPath: string;
  breadcrumbLabel?: string;
}

export interface BlogArticleStructuredData {
  headline: string;
  description: string;
  canonicalPath: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
}

@Injectable({ providedIn: 'root' })
export class StructuredDataService {
  private readonly document = inject(DOCUMENT);

  setStaticPageData(page: StaticPageData): void {
    if (page.canonicalPath === '/') {
      this.write(this.homepageGraph());
      return;
    }

    if (page.breadcrumbLabel) {
      const currentUrl = new URL(page.canonicalPath, SITE_ORIGIN).href;
      this.write({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          this.breadcrumbItem(1, 'Home', `${SITE_ORIGIN}/`),
          this.breadcrumbItem(2, 'Services', `${SITE_ORIGIN}/services/`),
          this.breadcrumbItem(3, page.breadcrumbLabel, currentUrl),
        ],
      });
      return;
    }

    this.remove();
  }

  setBlogArticleData(article: BlogArticleStructuredData): void {
    const canonicalUrl = new URL(article.canonicalPath, SITE_ORIGIN).href;
    const imageUrl = new URL(article.image, SITE_ORIGIN).href;
    const authorIsRuth = article.author.toLowerCase().includes('ruth perez acosta');
    const author: Record<string, unknown> = {
      '@type': 'Person',
      name: article.author,
    };

    if (authorIsRuth) {
      author['@id'] = RUTH_ID;
      author['url'] = `${SITE_ORIGIN}/about/`;
    }

    this.write({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          '@id': `${canonicalUrl}#article`,
          url: canonicalUrl,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
          },
          headline: article.headline,
          description: article.description,
          image: {
            '@type': 'ImageObject',
            url: imageUrl,
            caption: article.imageAlt,
          },
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          author,
          publisher: this.publisher(),
          isAccessibleForFree: true,
          inLanguage: 'en-US',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            this.breadcrumbItem(1, 'Home', `${SITE_ORIGIN}/`),
            this.breadcrumbItem(2, 'Blog', `${SITE_ORIGIN}/blog/`),
            this.breadcrumbItem(3, article.headline, canonicalUrl),
          ],
        },
      ],
    });
  }

  remove(): void {
    this.document.getElementById(STRUCTURED_DATA_ID)?.remove();
    this.document.getElementById('blog-post-structured-data')?.remove();
  }

  private homepageGraph(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': WEBSITE_ID,
          url: `${SITE_ORIGIN}/`,
          name: 'Therapy with Ruth',
          inLanguage: 'en-US',
          publisher: { '@id': ORGANIZATION_ID },
        },
        {
          '@type': 'Organization',
          '@id': ORGANIZATION_ID,
          url: `${SITE_ORIGIN}/`,
          name: 'Therapy with Ruth',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_ORIGIN}/favicon.png`,
            width: 128,
            height: 128,
          },
          founder: { '@id': RUTH_ID },
          sameAs: [PSYCHOLOGY_TODAY_URL],
          areaServed: {
            '@type': 'State',
            name: 'New York',
          },
        },
        {
          '@type': 'Person',
          '@id': RUTH_ID,
          name: 'Ruth Perez Acosta',
          honorificSuffix: 'LMHC',
          jobTitle: 'Licensed Mental Health Counselor',
          url: `${SITE_ORIGIN}/about/`,
          image: `${SITE_ORIGIN}/images/ruth-headshot.jpeg`,
          worksFor: { '@id': ORGANIZATION_ID },
          sameAs: [PSYCHOLOGY_TODAY_URL],
          knowsAbout: [
            'Anxiety and depression',
            'Trauma and PTSD',
            'Body image and eating concerns',
            'Life transitions',
            'Communication and self esteem',
            'Racism and immigrant experiences',
          ],
        },
      ],
    };
  }

  private publisher(): Record<string, unknown> {
    return {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'Therapy with Ruth',
      url: `${SITE_ORIGIN}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/favicon.png`,
        width: 128,
        height: 128,
      },
    };
  }

  private breadcrumbItem(position: number, name: string, item: string): Record<string, unknown> {
    return {
      '@type': 'ListItem',
      position,
      name,
      item,
    };
  }

  private write(data: Record<string, unknown>): void {
    this.remove();
    const script = this.document.createElement('script');
    script.id = STRUCTURED_DATA_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
  }
}
