import { DatePipe } from '@angular/common';
import { Component, ElementRef, inject, PendingTasks, signal, viewChild } from '@angular/core';
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
  private readonly articleScroller = viewChild<ElementRef<HTMLElement>>('articleScroller');
  private readonly blogService = inject(SanityBlogService);
  private readonly pendingTasks = inject(PendingTasks);

  protected readonly posts = signal<BlogPostSummary[] | null>(null);
  protected readonly loadFailed = signal(false);

  constructor() {
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

  protected scrollArticles(direction: -1 | 1): void {
    const scroller = this.articleScroller()?.nativeElement;

    if (!scroller) {
      return;
    }

    scroller.scrollBy({
      left: direction * scroller.clientWidth * 0.8,
      behavior: 'smooth',
    });
  }
}
