import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SessionService } from './session.service';
import { UsersService } from './users.service';
import { AuthUserCredential, FirebaseUser, googleAuthProvider, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: AuthUserCredential;
  private signUp = new Subject<void>();

  user: FirebaseUser;
  signUp$ = this.signUp.asObservable();

  constructor(
    private afauth: AngularFireAuth,
    private sessionService: SessionService,
    private userService: UsersService
  ) {
    this.getUserData()
      .subscribe((user: FirebaseUser) => {
        this.user = user;
    });
  }

  loginWithGoogle(sessionId: string, isAdmin: boolean): Observable<User> {
    // login to the system using google authentication
    return from(this.afauth.signInWithPopup(googleAuthProvider()))
      .pipe(switchMap((userCredential: AuthUserCredential) => {
        this.authState = userCredential;
        // save user and session id to database
        const { displayName, email, photoURL } = userCredential.user;
        return this.userService.updateCurrentUser({
          name: displayName, email, photoURL, sessionId, isAdmin, removedByAdmin: false
        });
      }));
  }

  logout(): Observable<void> {
    this.sessionService.clearSessionId();

    return this.getUserData()
      .pipe(
        switchMap((user: FirebaseUser) => {
          return this.userService.updateCurrentUser({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          });
        }),
        switchMap(() => this.afauth.signOut()
      )
    );
  }

  getUserData(): Observable<FirebaseUser> {
    return this.afauth.authState;
  }

  dispatchSignUp() {
    this.signUp.next();
  }
}
