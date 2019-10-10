import { Component, OnInit } from '@angular/core';
import { TickectsService } from 'src/app/services/tickects.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  ticket = '';
  tickets = [];

  constructor(private ticketsService: TickectsService) { }

  ngOnInit() {
    this.ticketsService.getTickets().subscribe(tickets => this.tickets = tickets);
  }

  onAddTicket() {
    this.ticketsService.addTicket({
      title: this.ticket,
      sessionId: 1000,
    }).then(() => {
      this.ticket = '';
    });
  }

}
