import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatTableExporterDirective } from 'mat-table-exporter';
import { take, combineLatest, map } from 'rxjs/operators';

import { HeaderService, TicketsService, VoteService } from './../../services';
import { Ticket, Vote, Report } from 'src/app/models';
import { Location } from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less']
})
export class ReportComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    if (this.dataSource) { this.dataSource.sort = sort; }
  }
  @ViewChild('exporter', { static: false }) exporter: MatTableExporterDirective;

  private tickets: Ticket[];
  private votes: Vote[];

  showTable = false;
  showError = false;
  report: Report[] = [];
  sessionId: string;
  displayedColumns: string[] = ['index', 'title', 'average'];
  dataSource: MatTableDataSource<Report>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private headerService: HeaderService,
    private ticketsService: TicketsService,
    private voteService: VoteService,
    ) { }

  ngOnInit() {
    this.headerService.dispatchShowBackButton();
    this.sessionId = this.activatedRoute.snapshot.params.id;

    if (this.sessionId) {
      this.getReportData();
    } else {
      this.location.back();
    }
  }

  ngOnDestroy() {
    this.headerService.dispatchShowBackButton(false);
  }

  onExportToExcel() {
    this.exporter.exportTable('xlsx', {
      fileName: `report_${this.sessionId}_${(new Date()).toLocaleDateString('en-US')}`,
    });
  }

  private getReportData() {
    this.voteService.getVotesBySessionId(this.sessionId)
      .pipe(
        combineLatest(this.ticketsService.getTickets(this.sessionId)),
        take(1),
        map(([votes, tickets]) => {
          return { votes, tickets };
        })
      )
      .subscribe((obj: { votes: Vote[], tickets: Ticket[] }) => {
        this.votes = obj.votes;
        this.tickets = obj.tickets;
        this.populateReport();
      });
  }

  private populateReport() {
    this.votes.forEach((vote: Vote, index: number) => {
      const ticket = this.tickets.find((t: Ticket) => vote.ticketId === t.ticketId);
      if (ticket) {
        this.report.push({...vote, title: ticket.title, index: index + 1 });
      }
    });

    if (this.report.length) {
      this.showTable = true;
      this.dataSource = new MatTableDataSource(this.report);
    } else {
      this.showError = true;
    }
  }
}
