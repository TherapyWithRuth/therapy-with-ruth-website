import { DOCUMENT } from '@angular/common';
import { Component, HostListener, effect, inject, signal } from '@angular/core';
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
