import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MenuBar } from './menu-bar';

describe('MenuBar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuBar],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the primary and service links', () => {
    const fixture = TestBed.createComponent(MenuBar);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(compiled.querySelectorAll('a')).map((link) =>
      link.textContent?.trim(),
    );

    expect(links).toContain('Home');
    expect(links).toContain('Services');
    expect(links).toContain('Communication & Self-Esteem');
    expect(links).toContain('Blog');
  });
});
