import { Card } from './card.model';

export interface Vote {
  average?: number;
  sessionId?: string;
  ticketId?: string;
  voted?: boolean;
  results?: Card[];
}
