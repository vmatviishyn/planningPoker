import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { take } from 'rxjs/operators';

import { NotificationService } from './../../services/notification.service';
import { SessionService } from 'src/app/services/session.service';
import { UsersService } from 'src/app/services/users.service';

import { User, Ticket, Card } from 'src/app/models';
import { TickectsService } from 'src/app/services/tickects.service';
import { VoteService } from 'src/app/services/vote.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.less']
})
export class RoomComponent implements OnInit {
  currentUser: User;
  users$: Observable<User[]>;
  session;
  activeTicket$: Observable<Ticket[]>;
  showResults = false;
  votes: any;

  constructor(
    private notificationService: NotificationService,
    private sessionService: SessionService,
    private userService: UsersService,
    private ticketService: TickectsService,
    private voteService: VoteService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.users$ = this.userService.getUsers();
    this.sessionService.getSessionData().subscribe(data => {
      this.session = data;
      if (this.session.activeTicket) {
        this.activeTicket$ = this.ticketService.getTicketById(this.session.activeTicket);
      }
    });
    this.geUserInfo();
  }

  private geUserInfo() {
    this.userService.getCurrentUser()
      .pipe(take(1))
      .subscribe((user: User) => {
        this.currentUser = user;

        if (this.currentUser) {
          this.notificationService.show(`Hi, ${this.currentUser.name}!`);
        }
      });
  }

  onStartVoting() {
    this.ticketService.getFirst()
      .pipe(take(1))
      .subscribe((ticket: any) => {
        this.sessionService.updateValue('activeTicket', ticket[0].ticketId)
          .pipe(take(1))
          .subscribe();

        this.voteService.createVoteCollection(this.sessionService.getSessionId(), ticket[0].ticketId).then(() => console.log('collection created'));
      });
  }

  onCardClicked(card) {
    this.voteService.vote(this.authService.user.uid, card, this.session.activeTicket)
      .pipe(take(1))
      .subscribe(() => console.log('card clicked'));
  }

  onSkipTicket() {
    this.ticketService.updateValue('voted', true, this.session.activeTicket)
      .pipe(take(1))
      .subscribe(() => {
        this.showResults = false;
        this.onStartVoting();
      });
  }

  onFinishVoting() {
    this.voteService.getResults(this.session.activeTicket)
      .pipe(take(1))
      .subscribe(data => {
        this.showResults = true;
        this.votes = data;
      })
  }

}
