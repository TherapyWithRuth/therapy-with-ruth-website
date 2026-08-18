import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, startWith } from 'rxjs';

const SITE_ORIGIN = 'https://therapywithruth.com';

export interface PageSeoData {
  description: string;
  canonicalPath: string;
  image: string;
  imageAlt: string;
}

interface PageMetadata extends PageSeoData {
  title: string;
  type?: 'website' | 'article';
}

interface ArticleMetadata extends PageMetadata {
  publishedAt: string;
  author: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.applyRouteMetadata());
  }

  setArticleMetadata(metadata: ArticleMetadata): void {
    this.setPageMetadata({ ...metadata, type: 'article' });
    this.meta.updateTag({ property: 'article:published_time', content: metadata.publishedAt });
    this.meta.updateTag({ property: 'article:author', content: metadata.author });
  }

  setArticleNotFoundMetadata(): void {
    this.title.setTitle('Article Not Found | Therapy with Ruth');
    this.meta.updateTag({
      name: 'description',
      content: 'The requested Therapy with Ruth article could not be found.',
    });
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    this.removeArticleMetadata();
    this.removeCanonical();
  }

  private applyRouteMetadata(): void {
    let route = this.activatedRoute;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const seo = route.snapshot.data['seo'] as PageSeoData | undefined;
    const routeTitle = route.snapshot.title;

    if (!seo || typeof routeTitle !== 'string') {
      return;
    }

    this.setPageMetadata({ ...seo, title: routeTitle });
    this.removeArticleMetadata();
    this.document.getElementById('blog-post-structured-data')?.remove();
  }

  private setPageMetadata(metadata: PageMetadata): void {
    const canonicalUrl = new URL(metadata.canonicalPath, SITE_ORIGIN).href;
    const imageUrl = new URL(metadata.image, SITE_ORIGIN).href;

    this.title.setTitle(metadata.title);
    this.meta.updateTag({ name: 'description', content: metadata.description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large' });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Therapy with Ruth' });
    this.meta.updateTag({ property: 'og:type', content: metadata.type ?? 'website' });
    this.meta.updateTag({ property: 'og:title', content: metadata.title });
    this.meta.updateTag({ property: 'og:description', content: metadata.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:alt', content: metadata.imageAlt });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: metadata.title });
    this.meta.updateTag({ name: 'twitter:description', content: metadata.description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    this.meta.updateTag({ name: 'twitter:image:alt', content: metadata.imageAlt });
    this.setCanonical(canonicalUrl);
  }

  private setCanonical(url: string): void {
    let canonical = this.document.head.querySelector<HTMLLinkElement>("link[rel='canonical']");

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }

    canonical.href = url;
  }

  private removeCanonical(): void {
    this.document.head.querySelector("link[rel='canonical']")?.remove();
  }

  private removeArticleMetadata(): void {
    this.meta.removeTag("property='article:published_time'");
    this.meta.removeTag("property='article:author'");
  }
}
