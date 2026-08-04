import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostBinding, inject } from '@angular/core';

export interface PageSection {
  scrollToSection(behavior?: ScrollBehavior): void;
}

@Directive()
export abstract class ScrollSnapSection implements PageSection {
  private readonly document = inject(DOCUMENT);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  @HostBinding('style.scroll-snap-align')
  protected readonly scrollSnapAlign = 'start';

  @HostBinding('style.scroll-snap-stop')
  protected readonly scrollSnapStop = 'normal';

  @HostBinding('style.height')
  protected readonly sectionHeight = '100svh';

  scrollToSection(behavior: ScrollBehavior = 'smooth'): void {
    const prefersReducedMotion = this.document.defaultView?.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    this.element.nativeElement.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : behavior,
      block: 'start',
    });
  }
}
