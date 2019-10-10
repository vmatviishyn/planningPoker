import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { auth } from 'firebase/app';
import { UsersService } from './users.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: firebase.auth.UserCredential;

  constructor(private afauth: AngularFireAuth, private userService: UsersService) {
    // For test purpose (user state)
    this.afauth.authState.subscribe(user => {
      console.log('user', user);
    });
  }

  loginWithGoogle(sessionId: string): Observable<User> {
    // login to the system using google authentication
    return from(this.afauth.auth.signInWithPopup(new auth.GoogleAuthProvider()))
      .pipe(switchMap((userCredential: firebase.auth.UserCredential) => {
        this.authState = userCredential;
        // save user and session id to database
        return this.userService.addUser(userCredential.user.displayName, sessionId);
      }));
  }

  // For test purpose
  logout() {
    this.afauth.auth.signOut();
  }
}
