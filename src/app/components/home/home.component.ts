import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuthService, HashService, NotificationService, SessionService, ThemeService } from 'src/app/services';
import { User, Session, ThemeConfiguration } from 'src/app/models';
import { fadeIn } from 'src/app/animations';
import { NewProductModalComponent } from '../new-product-modal/new-product-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeIn],
})
export class HomeComponent implements OnInit {
  sessionId: string;
  isSessionExists = false;
  christmasThemeEnabled$: Observable<ThemeConfiguration> = this.themeService.christmasThemeEnabled();
  shownNewProductKey = 'shown-new-product';

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private activateRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private hashService: HashService,
    private router: Router,
    private themeService: ThemeService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.openNewProductModal();
    // get session id from query params
    this.sessionId = this.sessionService.getSessionId();

    if (this.sessionId) {
      // if session id exists in url, check it from database
      this.checkSession();
    }
  }

  onLoginWithGoogle() {
    // generate new session id
    let sessionId = this.hashService.generateHash();

    if (this.isSessionExists) {
      // session id is exists in database
      sessionId = this.sessionId;
    }
    this.authService.loginWithGoogle(sessionId, !this.isSessionExists)
      .pipe(take(1))
      .subscribe((user: User) => {
        if (this.isSessionExists) {
          this.navigateToRoom(this.sessionId);
        } else {
          this.createSession(user.sessionId);
        }
      });
  }

  private createSession(id: string) {
    this.sessionService.createSession(id).then(() => {
      this.navigateToRoom(id);
    });
  }

  private checkSession() {
    this.sessionService.getSessionData()
      .pipe(take(1))
      .subscribe((session: Session) => {
        this.isSessionExists = !!session;
        if (session) {
          this.notificationService.show(`Session ${session.id} exists!`);
          this.router.navigate([],
            {
              relativeTo: this.activateRoute,
              queryParams: { sessionId: this.sessionId },
              queryParamsHandling: 'merge'
            });
        } else {
          this.notificationService.show(`Session ${this.sessionId} does not exist!`);
        }
      });
  }

  private navigateToRoom(id: string) {
    this.router.navigate(['room'], { queryParams: { sessionId: id } });
    this.authService.dispatchSignUp();
  }

  private openNewProductModal() {
    if (localStorage.getItem(this.shownNewProductKey)) { return; }

    this.dialog.open(NewProductModalComponent, { panelClass: 'new-product'})
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => localStorage.setItem(this.shownNewProductKey, 'true'));
  }
}
