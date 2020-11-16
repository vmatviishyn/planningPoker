import { FirestoreFieldValue } from './firebase.model';

export interface Session {
  id: string;
  title?: string;
  cardsType?: string;
  timestamp?: FirestoreFieldValue;
  activeTicket?: string;
}
