import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { take, withLatestFrom } from 'rxjs/operators';

import {
  AuthService,
  NotificationService,
  SessionService,
  TicketsService,
  UsersService,
  VoteService,
} from 'src/app/services';

import { UserDetailsComponent } from './user-details/user-details.component';
import { User, Ticket, Session, Card, Vote } from 'src/app/models';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.less']
})
export class RoomComponent implements OnInit, OnDestroy {
  sessionSub: Subscription;
  ticketsSub: Subscription;

  currentUser: User;
  users$: Observable<User[]>;
  session: Session;
  activeTicket$: Observable<Ticket>;
  showResults = false;
  vote: Vote;
  votes: { data: Card[], vote: Vote };
  selectedCard: Card;
  tickets: Ticket[];

  constructor(
    private notificationService: NotificationService,
    private sessionService: SessionService,
    private userService: UsersService,
    private ticketsService: TicketsService,
    private voteService: VoteService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.users$ = this.userService.getUsers();
    this.geUserInfo();
    this.getSessionData();
    this.getTickets();
  }

  ngOnDestroy() {
    this.sessionSub.unsubscribe();
    this.ticketsSub.unsubscribe();
  }

  onStartVoting() {
    this.showResults = false;
    this.getFirstTicket();
  }

  onCardClicked(card: Card) {
    if (!this.session.activeTicket) {
      return this.notificationService.showError('Please, select a ticket for start voting.');
    }

    this.voteService.vote(this.authService.user.uid, card, this.session.activeTicket)
      .pipe(
        withLatestFrom(this.userService.updateVotes(card.secondaryText, this.session.id, this.authService.user.uid, true)),
        take(1)
      ).subscribe(() => this.selectedCard = card);
  }

  onSkipTicket() {
    this.showResults = false;

    if (!this.session.activeTicket) {
      return this.notificationService.showError('Please, select a ticket for start voting.');
    }

    this.ticketsService.updateValue('voted', true, this.session.activeTicket)
      .pipe(take(1))
      .subscribe(() => {
        this.showResults = false;
        this.getFirstTicket();
      });
  }

  onFinishVoting() {
    this.finishVoting();
  }

  onUserClick(user: User) {
    this.dialog.open(UserDetailsComponent, {
      width: '60vh',
      data: {
        user,
        currentUser: this.currentUser
      },
      panelClass: 'full-container'
    });
  }

  onAddTicket(ticket: Ticket) {
    this.ticketsService.addTicket(ticket)
      .pipe(take(1))
      .subscribe();
  }

  onRemoveTicket(ticket: Ticket) {
    this.ticketsService.removeTicket(ticket)
      .pipe(take(1))
      .subscribe();
  }

  private getFirstTicket() {
    this.ticketsService.getFirst()
      .pipe(take(1))
      .subscribe((ticket: Ticket) => {
        if (!ticket) {
          return this.emptyListNotification();
        }

        forkJoin(
          this.sessionService.updateValue('activeTicket', ticket.ticketId),
          this.voteService.createVoteCollection(this.sessionService.getSessionId(), ticket.ticketId)
        ).pipe(take(1))
         .subscribe();
      });
  }

  onSetAverage(average: number) {
    this.voteService.setAverage(this.session.activeTicket, average)
      .pipe(take(1))
      .subscribe();
  }

  private finishVoting() {
    this.voteService.finishVoting(this.session.activeTicket)
      .pipe(take(1))
      .subscribe();
  }

  private getResults() {
    this.voteService.getResults(this.session.activeTicket)
      .pipe(take(1))
      .subscribe((data: Card[]) => {
        this.selectedCard = null;
        if (data && data.length) {
          this.showResults = true;
          this.votes = { data, vote: this.vote };
        } else {
          this.emptyListNotification();
        }
      });
  }

  private getSessionData() {
    let voteSub: Subscription;

    this.sessionSub = this.sessionService.getSessionData()
      .subscribe((data: Session) => {
        if (!data) {
          return this.router.navigate(['home']);
        }

        this.session = data;
        this.selectedCard = null;
        this.userService.updateVotes(null, this.session.id, this.authService.user.uid, false)
          .pipe(take(1))
          .subscribe();

        if (data.activeTicket) {
          console.log('active ticket', data.activeTicket);
          this.activeTicket$ = this.ticketsService.getTicketById(this.session.activeTicket);
          this.showResults = false;

          // when admin is clicked on vinish voting, 'voted' field will be set to 'true'
          // and it will trigger getting results of current ticket for all users
          // Prevent multiple subscriptions
          if (voteSub) { voteSub.unsubscribe(); }

          voteSub = this.voteService.getVoteByTicketId(this.session.activeTicket)
            .subscribe((vote: Vote) => {
              console.log('vote', vote);
              if (vote && vote.voted) {
                this.vote = vote;
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

  private getTickets() {
    this.ticketsSub = this.ticketsService.getTickets()
      .subscribe((tickets: Ticket[]) => {
        this.tickets = tickets;
      });
  }

  private emptyListNotification() {
    this.notificationService.showError('Tickets list is empty. Please add new ticket for start voting');
  }

}
