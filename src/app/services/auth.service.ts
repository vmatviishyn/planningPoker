import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, from, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { auth } from 'firebase/app';
import { SessionService } from './session.service';
import { UsersService } from './users.service';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: firebase.auth.UserCredential;
  public user: firebase.User;

  constructor(
    private afauth: AngularFireAuth,
    private sessionService: SessionService,
    private userService: UsersService
  ) {
    this.getUserData()
      .pipe(take(1))
      .subscribe((user: firebase.User) => {
        console.log('user', user);
        this.user = user;
    });
  }

  loginWithGoogle(sessionId: string, isAdmin: boolean): Observable<User> {
    // login to the system using google authentication
    return from(this.afauth.auth.signInWithPopup(new auth.GoogleAuthProvider()))
      .pipe(switchMap((userCredential: firebase.auth.UserCredential) => {
        this.authState = userCredential;
        // save user and session id to database
        const { displayName, email, photoURL } = userCredential.user;
        return this.userService.updateCurrentUser(displayName, email, photoURL, sessionId, isAdmin);
      }));
  }

  logout(): Observable<void> {
    this.sessionService.clearSessionId();

    return this.getUserData()
      .pipe(
        switchMap((user: firebase.User) => this.userService.updateCurrentUser(user.displayName, user.email, user.photoURL, '', false)),
        switchMap(() => from(this.afauth.auth.signOut())
      )
    );
  }

  getUserData(): Observable<firebase.User> {
    return this.afauth.authState;
  }
}
