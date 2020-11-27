import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as Snowflakes from 'magic-snowflakes';

import { ConfigurationService } from './configuration.service';
import { Configuration, Theme, ThemeConfiguration } from '../models';
import { Debounce } from '../decorators';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private snowflakes: { destroy: () => void };

  constructor(
    @Inject(DOCUMENT) private document,
    private configurationService: ConfigurationService,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  init() {
    this.isChristmasThemeEnabled();
  }

  christmasThemeEnabled(): Observable<ThemeConfiguration> {
    return this.isChristmasThemeEnabled();
  }

  private isChristmasThemeEnabled(): Observable<ThemeConfiguration> {
    return this.configurationService.configs$.pipe(
      map(({ theme, loaded }: Configuration) => {
        return {
          loaded,
          christmasThemeEnabled: theme === Theme.Christmas,
        };
      }),
      tap(({ christmasThemeEnabled }: ThemeConfiguration) => this.initChristmasTheme(christmasThemeEnabled)),
    );
  }

  @Debounce(100)
  private initChristmasTheme(enabled: boolean): void {
    this.renderer[enabled ? 'addClass' : 'removeClass'](this.document.body, 'christmas-theme');

    if (!this.snowflakes && enabled) {
      this.snowflakes = new Snowflakes({
        count: 30,       // Default: 50
        color: '#fff',   // Default: "#5ECDEF"
        minOpacity: 0.7, // From 0 to 1. Default: 0.6
        minSize: 10,     // Default: 8
        maxSize: 30,     // Default: 18
        wind: false,     // Without wind. Default: true
      });
    } else if (this.snowflakes && !enabled) {
      this.snowflakes.destroy();
      this.snowflakes = null;
    }
  }
}
