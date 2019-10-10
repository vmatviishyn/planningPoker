import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class TickectsService {
  constructor(private afs: AngularFirestore) {}

  getTickets() {
    return this.afs.collection('tickets', ref => ref.orderBy('timestamp')).valueChanges();
  }

  addTicket(ticket: Ticket) {
    return this.afs.collection('tickets').add(ticket);
  }
}

interface Ticket {
  id?: string;
  title?: string;
  href?: string;
  sessionId?: number;
  timestamp?: string;
};