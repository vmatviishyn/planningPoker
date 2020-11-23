import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { Observable, of } from 'rxjs';
import * as Snowflakes from 'magic-snowflakes';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;

  constructor(@Inject(DOCUMENT) private document, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  init() {
    this.isChristmasThemeEnabled() && this.initChristmasTheme();
  }

  christmasThemeEnabled(): Observable<boolean> {
    return of(this.isChristmasThemeEnabled());
  }

  private isChristmasThemeEnabled(): boolean {
    // @TODO: Add logic
    return true;
  }

  private initChristmasTheme(): void {
    this.renderer.addClass(this.document.body, 'christmas-theme');

    new Snowflakes({
      color: '#fff',   // Default: "#5ECDEF"
      minOpacity: 0.7, // From 0 to 1. Default: 0.6
      minSize: 10,     // Default: 8
      maxSize: 30,     // Default: 18
      wind: false,     // Without wind. Default: true
    });
  }
}
