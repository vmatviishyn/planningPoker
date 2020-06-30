import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UrlParserService } from '../../../services';

@Component({
  selector: 'app-textfield-popup',
  templateUrl: './textfield-popup.component.html',
  styleUrls: ['./textfield-popup.component.scss'],
  providers: [UrlParserService]
})
export class TextfieldPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private urlParser: UrlParserService) { }

  getLinksArray(text: string): string[] {
    return this.urlParser.parseUrls(text);
  }

}
