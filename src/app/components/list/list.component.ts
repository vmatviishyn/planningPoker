import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import * as firebase from 'firebase/app';
import { SessionService } from './../../services/session.service';
import { HashService } from './../../services/hash.service';

import { Ticket, User, Session } from 'src/app/models';
import { TextfieldPopupComponent } from './textfield-popup/textfield-popup.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input() currentUser: User;
  @Input() session: Session;
  @Input() tickets: Ticket[];
  @Output() addTicket = new EventEmitter<Ticket>();
  @Output() removeTicket = new EventEmitter<Ticket>();

  ticket = '';

  constructor(
    private sessionService: SessionService,
    private hashService: HashService,
    public dialog: MatDialog
  ) { }

  onAddTicket(): void {
    this.sendTicket(this.ticket);
    this.ticket = '';
  }

  addTicketsFromText(): void {
    this.dialog.open(TextfieldPopupComponent, {
      width: '70vw',
    }).afterClosed()
      .subscribe(result => {
        if (result) {
          result.forEach(this.sendTicket.bind(this));
        }
    });
  }

  onRemoveTicket(ticket: Ticket) {
    this.removeTicket.emit(ticket);
  }

  private sendTicket(title: string) {
    this.addTicket.emit({
      sessionId: this.sessionService.getSessionId(),
      ticketId: this.hashService.generateHash(32),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      title,
      voted: false
    });
  }
}
