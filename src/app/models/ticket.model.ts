export interface Ticket {
  title?: string;
  href?: string;
  sessionId?: string;
  timestamp?: firebase.firestore.FieldValue;
}
