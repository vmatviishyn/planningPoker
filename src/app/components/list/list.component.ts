import { Component, OnInit } from '@angular/core';
import { TickectsService } from 'src/app/services/tickects.service';
import * as firebase from 'firebase/app';

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
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(() => {
      this.ticket = '';
    });
  }

}
