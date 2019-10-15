import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { NotificationService } from './../../services/notification.service';
import { SessionService } from 'src/app/services/session.service';
import { UsersService } from 'src/app/services/users.service';
import { TickectsService } from 'src/app/services/tickects.service';
import { VoteService } from 'src/app/services/vote.service';
import { AuthService } from 'src/app/services/auth.service';

import { User, Ticket, Session, Card, Vote } from 'src/app/models';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.less']
})
export class RoomComponent implements OnInit, OnDestroy {
  sessionSub: Subscription;

  currentUser: User;
  users$: Observable<User[]>;
  session: Session;
  activeTicket$: Observable<Ticket>;
  showResults = false;
  votes: any;
  isVotingStarted = false;
  selectedCard: Card;

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
    this.geUserInfo();
    this.getSessionData();
  }

  ngOnDestroy() {
    this.sessionSub.unsubscribe();
  }

  onStartVoting() {
    this.ticketService.getFirst()
      .pipe(take(1))
      .subscribe((ticket: Ticket) => {
        if (!ticket) {
          return this.emptyListNotification();
        }

        this.isVotingStarted = true;

        this.sessionService.updateValue('activeTicket', ticket.ticketId)
          .pipe(take(1))
          .subscribe();

        this.voteService.createVoteCollection(this.sessionService.getSessionId(), ticket.ticketId)
          .then(() => console.log('collection created'));
      });
  }

  onCardClicked(card: Card) {
    if (!this.session.activeTicket) {
      return this.notificationService.show('Please, select a ticket for start voting');
    }

    if (this.isVotingStarted) {
      this.voteService.vote(this.authService.user.uid, card, this.session.activeTicket)
        .pipe(take(1))
        .subscribe(() => {
          this.selectedCard = card;
          console.log('card clicked');
        });
    } else {
      this.notificationService.showError('Click start button to begin voting.');
    }
  }

  onSkipTicket() {
    if (!this.session.activeTicket) {
      return this.notificationService.show('Please, select a ticket for start voting');
    }

    this.ticketService.updateValue('voted', true, this.session.activeTicket)
      .pipe(take(1))
      .subscribe(() => {
        this.showResults = false;
        this.ticketService.getFirst()
          .pipe(take(1))
          .subscribe((ticket: Ticket) => {
            if (!ticket) {
              return this.emptyListNotification();
            }

            this.sessionService.updateValue('activeTicket', ticket.ticketId)
              .pipe(take(1))
              .subscribe();

            this.voteService.createVoteCollection(this.sessionService.getSessionId(), ticket.ticketId)
              .then(() => console.log('collection created'));
          });
      });
  }

  onFinishVoting() {
    this.finishVoting();
  }

  private finishVoting() {
    this.voteService.finishVoting(this.session.activeTicket)
      .pipe(take(1))
      .subscribe(() => console.log('finished voting'));
  }

  private getResults() {
    this.voteService.getResults(this.session.activeTicket)
      .pipe(take(1))
      .subscribe(data => {
        if (data && data.length) {
          this.showResults = true;
          this.votes = data;
        } else {
          this.emptyListNotification();
        }
      });
  }

  private getSessionData() {
    this.sessionSub = this.sessionService.getSessionData()
      .subscribe((data: Session) => {
        this.session = data;

        if (data.activeTicket) {
          console.log('active ticket', data.activeTicket);
          this.activeTicket$ = this.ticketService.getTicketById(this.session.activeTicket);

          // when admin is clicked on vinish voting, 'voted' field will be set to 'true'
          // and it will trigger getting results of current ticket for all users
          const voteSub = this.voteService.getVoteByTicketId(this.session.activeTicket)
            .subscribe((vote: Vote) => {
              console.log('vote', vote);
              if (vote.voted) {
                this.getResults();
              }
            });

          // save subscription to variable for unsubscribing when component will be destroyed
          this.sessionSub.add(voteSub);
        }
    });
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

  private emptyListNotification() {
    this.notificationService.showError('Tickets list is empty. Please add new ticket for start voting');
  }

}
