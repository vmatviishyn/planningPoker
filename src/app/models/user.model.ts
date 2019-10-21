export interface User {
  name?: string;
  email?: string;
  sessionId?: string;
  photoURL?: string;
  isAdmin?: boolean;
  vote?: string;
  voted?: boolean;
  removedByAdmin?: boolean;
}
