import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService, HeaderService, NotificationService, SessionService, UsersService, RateService, ThemeService } from './services';

import { Rate, Session, User, messages, FirebaseUser, ThemeConfiguration } from 'src/app/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  private userDataSub: Subscription;

  rates = 0;
  userData: User;
  christmasThemeEnabled$: Observable<ThemeConfiguration> = this.themeService.christmasThemeEnabled();
  showBackButton$ = this.headerService.showBackButton$;
  user$: Observable<FirebaseUser>;
  session$: Observable<Session>;

  constructor(
    private authService: AuthService,
    private headerService: HeaderService,
    private location: Location,
    private notificationService: NotificationService,
    private rateService: RateService,
    private router: Router,
    private themeService: ThemeService,
    private sessionService: SessionService,
    private userService: UsersService,
  ) {}

  ngOnInit() {
    this.sessionService.setSessionId();
    this.themeService.init();
    this.user$ = this.authService.getUserData();
    this.getSessionData();
    this.getCurrentUser();
    this.sessionChange();
    this.onRatesCalculate();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.userDataSub.unsubscribe();
  }

  onGoBack() {
    this.location.back();
  }

  onRate() {
    if (!this.authService.user) { return; }

    this.rateService.rate(this.authService.user.uid)
      .pipe(take(1))
      .subscribe();
  }

  logout() {
    this.authService.logout()
      .pipe(take(1))
      .subscribe(() => {
        this.notificationService.show(messages.loggedOut);
        this.navigateToHome();
      });
  }

  private onRatesCalculate() {
    this.rateService.getRates()
      .subscribe((data: Rate[]) => {
        this.rates = 0;

        data.forEach((item: Rate) => this.rates += item.count);

        if (this.rates < 0) {
          this.rates = 0;
        }
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
