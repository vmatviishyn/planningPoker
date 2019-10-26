import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { SessionService } from 'src/app/services/session.service';
import { UsersService } from './services/users.service';

import { Session, User } from 'src/app/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  private userDataSub: Subscription;

  userData: User;
  user$: Observable<firebase.User>;
  session$: Observable<Session>;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private sessionService: SessionService,
    private userService: UsersService,
  ) {}

  ngOnInit() {
    this.sessionService.setSessionId();
    this.user$ = this.authService.getUserData();
    this.getSessionData();
    this.getCurrentUser();
    this.sessionChange();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.userDataSub.unsubscribe();
  }

  logout() {
    this.authService.logout()
      .pipe(take(1))
      .subscribe(() => {
        this.notificationService.show('Successfully logged out.');
        this.navigateToHome();
      });
  }

  private sessionChange() {
    this.authSub = this.authService.signUp$.subscribe(() => this.getSessionData());
  }

  private getSessionData() {
    this.session$ = this.sessionService.getSessionData();
  }

  private getCurrentUser() {
    this.userDataSub = this.userService.getCurrentUser()
      .subscribe((user: User) => {
        this.userData = user;
        if (user && user.removedByAdmin) {
          this.sessionService.clearSessionId();
          this.navigateToHome();
        }
      });
  }

  private navigateToHome() {
    this.router.navigate(['home']);
  }
}
