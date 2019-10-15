import { Card } from './card.model';

export interface Vote {
  sessionId?: string;
  ticketId?: string;
  voted?: boolean;
  results?: Card[];
}
