import { Component, signal } from '@angular/core';
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
  protected readonly isMenuOpen = signal(false);

  protected readonly primaryLinks: NavigationLink[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
  ];

  protected readonly secondaryLinks: NavigationLink[] = [
    { label: 'Rates', path: '/rates' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
    { label: 'Blog', path: '/blog' },
  ];

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
