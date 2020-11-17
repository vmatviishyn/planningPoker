import { FirestoreFieldValue } from './firebase.model';

export interface Ticket {
  title?: string;
  href?: string;
  sessionId?: string;
  timestamp?: FirestoreFieldValue;
  ticketId?: string;
  skipped?: boolean;
  voted?: boolean;
}
