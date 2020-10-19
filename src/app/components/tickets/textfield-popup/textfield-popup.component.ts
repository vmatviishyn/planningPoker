import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { Debounce } from 'src/app/decorators';

import { UrlParserService } from '../../../services';

@Component({
  selector: 'app-textfield-popup',
  templateUrl: './textfield-popup.component.html',
  styleUrls: ['./textfield-popup.component.scss'],
  providers: [UrlParserService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextfieldPopupComponent implements OnInit {
  private storageKey = 'planningPoker:urlPrefix';

  text: string = '';
  urlPrefix: string = localStorage.getItem(this.storageKey);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private urlParser: UrlParserService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialogRef<TextfieldPopupComponent>,
  ) { }

  ngOnInit() {
    this.onBeforeClosed();
  }

  @Debounce()
  onPrefixKeyup() {
    if (this.text.length) {
      this.addPrefix();
    }
  }

  @Debounce(350)
  onTextKeyup() {
    if (this.urlParser.parseUrls(this.urlPrefix)) {
      this.addPrefix();
    }
  }

  getLinksArray(text: string): string[] {
    return this.urlParser.parseUrls(text);
  }

  private onBeforeClosed(): void {
    this.dialog.beforeClosed()
      .pipe(take(1))
      .subscribe(() => localStorage.setItem(this.storageKey, this.urlPrefix.trim()));
  }

  private addPrefix(): void {
    let text = '';
    this.text.split(/(\s+)/).forEach((item: string) => {
      const trimmed = item.trim();

      if (trimmed.length) {
        const splitted = trimmed.split('/');
        const value = splitted[splitted.length - 1];
        item = this.urlParser.parseUrls(this.urlPrefix) ? `${this.urlPrefix.trim()}/${value}` : value;
      }

      text += item;
    });

    this.text = text;
    this.cdr.markForCheck();
  }
}
