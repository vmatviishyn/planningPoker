import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { auth } from 'firebase/app';
import { SessionService } from './session.service';
import { UsersService } from './users.service';
import { User } from '../models/user.model';
import { Session } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: firebase.auth.UserCredential;

  constructor(
    private afauth: AngularFireAuth,
    private sessionService: SessionService,
    private userService: UsersService
  ) {
    // For test purpose (user state)
    this.afauth.authState.subscribe((user: firebase.User) => {
      console.log('user', user);
    });
  }

  loginWithGoogle(sessionId: string, isAdmin: boolean): Observable<User> {
    // login to the system using google authentication
    return from(this.afauth.auth.signInWithPopup(new auth.GoogleAuthProvider()))
      .pipe(switchMap((userCredential: firebase.auth.UserCredential) => {
        this.authState = userCredential;
        // save user and session id to database
        const { displayName, photoURL } = userCredential.user;
        return this.userService.addUser(displayName, photoURL, sessionId, isAdmin);
      }));
  }

  logout() {
    this.sessionService.clearSessionId();
    return from(this.afauth.auth.signOut())
      .pipe(
        switchMap(() => {
          return this.sessionService.removeOldSessions()
        }),
        switchMap((sessions: Session[]) => {
          return of(sessions);
        }),
      )
  }
}
