export interface Session {
  id: string;
  title?: string;
  cardsType?: string;
  timestamp?: firebase.firestore.FieldValue;
  activeTicket?: string;
}
