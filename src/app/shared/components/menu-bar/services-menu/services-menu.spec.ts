import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ServicesMenu } from './services-menu';

describe('ServicesMenu', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesMenu],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders all service links', () => {
    const fixture = TestBed.createComponent(ServicesMenu);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.services-menu__submenu a').length).toBe(6);
  });
});
