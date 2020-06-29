import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Ticket } from '../../../models';

@Component({
  selector: 'app-ticket-preview',
  templateUrl: './ticket-preview.component.html',
  styleUrls: ['./ticket-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketPreviewComponent {
  @Input() ticket: Ticket;
}
