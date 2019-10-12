import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { NotificationService } from './../../services/notification.service';
import { SessionService } from 'src/app/services/session.service';
import { CardTypes } from './../../models/card.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.less']
})
export class AdminPanelComponent implements OnInit {
  cardTypes = Object.keys(CardTypes);
  title = '';

  constructor(private sessionService: SessionService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  onUpdateTitle() {
    this.sessionService.updateValue('title', this.title)
      .pipe(take(1))
      .subscribe(() => {
        this.title = '';
        this.notificationService.show('Successfully updated title.');
      });
  }

  onChangeCardType(value: string) {
    this.sessionService.updateValue('cardsType', value)
      .pipe(take(1))
      .subscribe(() => {
        this.title = '';
        this.notificationService.show('Successfully updated cards type.');
      });
  }

}
