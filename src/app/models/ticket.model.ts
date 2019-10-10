export interface Ticket {
  id?: string;
  title?: string;
  href?: string;
  sessionId?: string;
  timestamp?: firebase.firestore.FieldValue;
}
