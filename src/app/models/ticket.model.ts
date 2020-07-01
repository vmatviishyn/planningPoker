export interface Ticket {
  title?: string;
  href?: string;
  sessionId?: string;
  timestamp?: firebase.firestore.FieldValue;
  ticketId?: string;
  skipped?: boolean;
  voted?: boolean;
}
