import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Ticket } from 'src/app/models';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsListComponent {
  @Input() activeId: string;
  @Input() isAdmin: boolean;
  @Input() tickets: Ticket[];
  @Input() isRevote: boolean;

  @Output() removeTicket = new EventEmitter<Ticket>();
  @Output() revote = new EventEmitter<Ticket>();

  onRemoveTicket(ticket: Ticket) {
    this.removeTicket.emit(ticket);
  }

  onRevote(ticket: Ticket) {
    this.revote.emit(ticket);
  }

}
