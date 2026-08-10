import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';

interface CalendlyWindow extends Window {
  Calendly?: {
    initInlineWidget(options: { url: string; parentElement: HTMLElement }): void;
  };
}

const CALENDLY_URL = 'https://calendly.com/therapywithruth/15-minute-consultation';
const CALENDLY_SCRIPT_URL = 'https://assets.calendly.com/assets/external/widget.js';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactPage {
  private readonly calendlyWidget = viewChild<ElementRef<HTMLElement>>('calendlyWidget');
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.document.documentElement.classList.add('free-scroll');
    this.destroyRef.onDestroy(() => {
      this.document.documentElement.classList.remove('free-scroll');
      this.document.querySelectorAll('.calendly-overlay').forEach((element) => element.remove());
    });

    afterNextRender(() => this.initializeCalendlyWidget());
  }

  private initializeCalendlyWidget(): void {
    const parentElement = this.calendlyWidget()?.nativeElement;
    const calendlyWindow = this.document.defaultView as CalendlyWindow | null;

    if (!parentElement || !calendlyWindow) {
      return;
    }

    const initialize = (): void => {
      if (!parentElement.childElementCount) {
        calendlyWindow.Calendly?.initInlineWidget({
          url: CALENDLY_URL,
          parentElement,
        });
      }
    };

    if (calendlyWindow.Calendly) {
      initialize();
      return;
    }

    let script = this.document.getElementById('calendly-widget-script') as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = 'calendly-widget-script';
      script.src = CALENDLY_SCRIPT_URL;
      script.async = true;
      script.type = 'text/javascript';
      script.addEventListener('load', initialize, { once: true });
      this.document.body.appendChild(script);
    } else {
      script.addEventListener('load', initialize, { once: true });
    }

    this.destroyRef.onDestroy(() => script?.removeEventListener('load', initialize));
  }
}
