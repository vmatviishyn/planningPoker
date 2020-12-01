import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { take } from 'rxjs/operators';

import { NotificationService, SessionService } from 'src/app/services';
import { CardTypes } from './../../models';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPanelComponent {
  @Input() selectedType: string;
  cardTypes = Object.keys(CardTypes);

  constructor(private sessionService: SessionService, private notificationService: NotificationService) { }

  onChangeCardType(value: string): void {
    this.sessionService.updateValue('cardsType', value)
      .pipe(take(1))
      .subscribe(() => {
        this.notificationService.show(`Changed to "${value}" type.`);
      });
  }

}
