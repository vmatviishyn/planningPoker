import { Injectable } from '@angular/core';

@Injectable()
export class UrlParserService {
  parseUrls(textForSearch: string): string[] {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return textForSearch.match(urlRegex);
  }
}
