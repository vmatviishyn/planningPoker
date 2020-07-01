import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import * as firebase from 'firebase/app';

import { Ticket, User, Session } from 'src/app/models';
import { TextfieldPopupComponent } from './textfield-popup/textfield-popup.component';
import { HashService, SessionService, UrlParserService } from 'src/app/services';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [UrlParserService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsComponent implements OnChanges {
  @Input() currentUser: User;
  @Input() session: Session;
  @Input() tickets: Ticket[];
  @Output() addTicket = new EventEmitter<Ticket>();
  @Output() removeTicket = new EventEmitter<Ticket>();
  @Output() revote = new EventEmitter<Ticket>();

  ticket = '';

  activeTickets: Ticket[];
  completedTickets: Ticket[];
  insertBefore = false;

  constructor(
    private sessionService: SessionService,
    private hashService: HashService,
    private urlParseService: UrlParserService,
    public dialog: MatDialog
  ) { }

  ngOnChanges() {
    if (this.tickets) {
      this.activeTickets = this.tickets.filter(ticket => !ticket.voted);
      this.completedTickets = this.tickets.filter(ticket => ticket.voted);
    }
  }

  onAddTicket(): void {
    let timestamp:firebase.firestore.FieldValue = null;

    if (this.insertBefore && this.tickets.length) {
      const nextDate = (this.tickets[0].timestamp as firebase.firestore.Timestamp).toDate();
      timestamp = firebase.firestore.Timestamp.fromDate(new Date(Number(nextDate) - 10));
    }

    this.sendTicket(this.ticket, timestamp);
    this.ticket = '';
  }

  addTicketsFromText(): void {
    this.dialog.open(TextfieldPopupComponent, {
      width: '70vw',
    }).afterClosed()
      .subscribe(result => {
        if (result) {
          result.forEach((title: string) => this.sendTicket(title));
        }
    });
  }

  onToggleChange(e: MatSlideToggleChange) {
    this.insertBefore = e.checked;
  }

  onRemoveTicket(ticket: Ticket) {
    this.removeTicket.emit(ticket);
  }

  onRevote(ticket: Ticket) {
    this.revote.emit(ticket);
  }

  private sendTicket(title: string, timestamp?: firebase.firestore.FieldValue) {
    const ticket: Ticket = {
      sessionId: this.sessionService.getSessionId(),
      ticketId: this.hashService.generateHash(32),
      timestamp: timestamp || firebase.firestore.FieldValue.serverTimestamp(),
      title,
      voted: false
    };

    if (this.urlParseService.parseUrls(title)) {
      Object.assign(ticket, { href: title });
    }
    this.addTicket.emit(ticket);
  }
}
