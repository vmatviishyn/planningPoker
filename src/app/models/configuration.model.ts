export interface Configuration {
  loaded?: boolean;
  theme: Theme;
}

export enum Theme {
  Christmas = 'CHRISTMAS',
  Default = 'DEFAULT',
}

export interface ThemeConfiguration {
  christmasThemeEnabled: boolean;
  loaded: boolean;
}
