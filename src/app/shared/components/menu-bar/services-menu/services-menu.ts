import { DOCUMENT } from '@angular/common';
import { Component, inject, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ServiceLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-services-menu',
  imports: [RouterLink],
  templateUrl: './services-menu.html',
  styleUrl: './services-menu.scss',
})
export class ServicesMenu {
  private readonly document = inject(DOCUMENT);

  readonly navigate = output<void>();

  protected readonly isSubmenuOpen = signal(false);

  protected readonly serviceLinks: ServiceLink[] = [
    { label: 'Depression & Anxiety', path: '/services/depression-anxiety' },
    { label: 'Body Image & Eating Disorder', path: '/services/body-image-eating-disorder' },
    { label: 'Life Transitions', path: '/services/life-transitions' },
    { label: 'Racism & Immigrant Experience', path: '/services/racism-immigrant-experience' },
    { label: 'Trauma & PTSD', path: '/services/trauma-ptsd' },
    { label: 'Communication & Self-Esteem', path: '/services/communication-self-esteem' },
  ];

  protected toggleSubmenu(): void {
    const isMobileViewport =
      this.document.defaultView?.matchMedia('(max-width: 48rem)').matches ?? false;

    if (!isMobileViewport) {
      return;
    }

    this.isSubmenuOpen.update((isOpen) => !isOpen);
  }

  protected closeSubmenu(): void {
    this.isSubmenuOpen.set(false);
    this.navigate.emit();
  }
}
