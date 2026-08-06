import { DOCUMENT, DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, PendingTasks, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import type { BlogPostSummary } from './blog.types';
import { SanityBlogService } from './sanity-blog.service';

@Component({
  selector: 'app-blog',
  imports: [DatePipe, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class BlogPage {
  private readonly blogService = inject(SanityBlogService);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly pendingTasks = inject(PendingTasks);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  protected readonly posts = signal<BlogPostSummary[] | null>(null);
  protected readonly loadFailed = signal(false);

  constructor() {
    this.document.documentElement.classList.add('free-scroll');
    this.destroyRef.onDestroy(() => this.document.documentElement.classList.remove('free-scroll'));

    const pageTitle = 'Therapy Blog and Mental Health Resources | Therapy with Ruth';
    const description =
      'Reflections and practical guidance for navigating anxiety, relationships, identity, and meaningful personal growth.';

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.removeTag("property='og:image'");
    this.meta.removeTag("name='twitter:image'");
    this.meta.removeTag("property='article:published_time'");
    this.meta.removeTag("property='article:author'");

    this.pendingTasks.run(async () => {
      try {
        this.posts.set(await this.blogService.getPosts());
      } catch {
        this.loadFailed.set(true);
        this.posts.set([]);
      }
    });
  }

  protected imageUrl(post: BlogPostSummary): string {
    return this.blogService.imageUrl(post.mainImage, 900, 600);
  }
}
