import { Component, OnInit } from '@angular/core';

import { SessionService } from 'src/app/services/session.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private sessionService: SessionService) {}

  ngOnInit() {
    this.sessionService.setSessionId()
  }

  logout() {
    this.authService.logout().subscribe(data => console.log(data));
  }
}
