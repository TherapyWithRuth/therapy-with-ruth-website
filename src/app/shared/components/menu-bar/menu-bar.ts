import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, HostListener, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ServicesMenu } from './services-menu/services-menu';

interface NavigationLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-menu-bar',
  imports: [RouterLink, ServicesMenu],
  templateUrl: './menu-bar.html',
  styleUrl: './menu-bar.scss',
})
export class MenuBar {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  private readonly updateVisualViewportOffset = (): void => {
    const offsetTop = this.document.defaultView?.visualViewport?.offsetTop ?? 0;

    this.document.documentElement.style.setProperty('--visual-viewport-top', `${offsetTop}px`);
  };

  protected readonly isMenuOpen = signal(false);

  protected readonly primaryLinks: NavigationLink[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
  ];

  protected readonly secondaryLinks: NavigationLink[] = [
    { label: 'FAQ', path: '/faq' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact for Consultation', path: '/contact' },
  ];

  constructor() {
    const visualViewport = this.document.defaultView?.visualViewport;

    this.updateVisualViewportOffset();
    visualViewport?.addEventListener('resize', this.updateVisualViewportOffset);
    visualViewport?.addEventListener('scroll', this.updateVisualViewportOffset);

    this.destroyRef.onDestroy(() => {
      visualViewport?.removeEventListener('resize', this.updateVisualViewportOffset);
      visualViewport?.removeEventListener('scroll', this.updateVisualViewportOffset);
      this.document.documentElement.style.removeProperty('--visual-viewport-top');
    });

    effect((onCleanup) => {
      if (!this.isMenuOpen()) {
        return;
      }

      const previousOverflow = this.document.body.style.overflow;
      this.document.body.style.overflow = 'hidden';
      onCleanup(() => (this.document.body.style.overflow = previousOverflow));
    });
  }

  @HostListener('document:keydown.escape')
  protected closeMenuWithEscape(): void {
    this.closeMenu();
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
