import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { User } from 'src/app/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  sessionId: string;
  isSessionExists: boolean;

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // get session id from query params
    this.sessionId = this.sessionService.getSessionId();

    if (this.sessionId) {
      console.log('checking for session', this.sessionId);
      // if session id exists in url, check it from database
      this.checkSession(this.sessionId);
    }
  }

  onLoginWithGoogle() {
    console.log(this.isSessionExists);
    // generate new session id
    let sessionId = this.sessionService.generateSession();

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

  private checkSession(id: string) {
    this.sessionService.checkSession(id)
      .pipe(take(1))
      .subscribe((isExists) => {
        this.isSessionExists = isExists;
        if (isExists) {
          console.log('session is exists');
          this.router.navigate([],
            {
              relativeTo: this.activateRoute,
              queryParams: { sessionId: this.sessionId },
              queryParamsHandling: 'merge'
            });
        } else {
          console.error(`Session with id=${id} is not exist!`);
        }
      });
  }

  private navigateToRoom(id: string) {
    this.router.navigate(['room'], { queryParams: { sessionId: id } });
  }

}
