import { DOCUMENT, DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { from, map, switchMap } from 'rxjs';
import { pendingUntilEvent, takeUntilDestroyed } from '@angular/core/rxjs-interop';

import type { BlogPost } from '../blog.types';
import { SanityBlogService } from '../sanity-blog.service';
import { SeoService } from '../../shared/seo.service';

@Component({
  selector: 'app-blog-article',
  imports: [DatePipe, RouterLink],
  templateUrl: './article.html',
  styleUrl: './article.scss',
})
export class BlogArticlePage {
  private readonly route = inject(ActivatedRoute);
  private readonly blogService = inject(SanityBlogService);
  private readonly seo = inject(SeoService);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly post = signal<BlogPost | null | undefined>(undefined);
  protected readonly articleHtml = signal('');
  protected readonly loadFailed = signal(false);

  constructor() {
    this.document.documentElement.classList.add('free-scroll');
    this.destroyRef.onDestroy(() => this.document.documentElement.classList.remove('free-scroll'));

    this.route.paramMap
      .pipe(
        map((params) => params.get('slug') ?? ''),
        switchMap((slug) => from(this.blogService.getPost(slug))),
        pendingUntilEvent(),
        takeUntilDestroyed(),
      )
      .subscribe({
        next: (post) => {
          this.post.set(post);

          if (!post) {
            this.seo.setArticleNotFoundMetadata();
            return;
          }

          this.articleHtml.set(this.blogService.renderArticle(post));
          this.setMetadata(post);
        },
        error: () => {
          this.loadFailed.set(true);
          this.post.set(null);
        },
      });
  }

  protected imageUrl(post: BlogPost): string {
    return this.blogService.imageUrl(post.mainImage, 1600);
  }

  private setMetadata(post: BlogPost): void {
    const title = `${post.seoTitle?.trim() || post.title} | Therapy with Ruth`;
    const description = post.seoDescription?.trim() || post.excerpt;
    const image = this.imageUrl(post);

    this.seo.setArticleMetadata({
      title,
      headline: post.title,
      description,
      canonicalPath: `/blog/${encodeURIComponent(post.slug)}/`,
      image,
      imageAlt: post.mainImage.alt,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      author: post.author,
    });
  }
}
