import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService, HeaderService, NotificationService, SessionService, UsersService } from './services';

import { Session, User } from 'src/app/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  private userDataSub: Subscription;

  userData: User;
  showBackButton$ = this.headerService.showBackButton$;
  user$: Observable<firebase.User>;
  session$: Observable<Session>;

  constructor(
    private authService: AuthService,
    private headerService: HeaderService,
    private location: Location,
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

  onGoBack() {
    this.location.back();
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
