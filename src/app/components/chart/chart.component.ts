import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

import { Card, Vote, User } from 'src/app/models';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() votes: { data: Card[], vote: Vote };
  @Input() currentUser: User;
  @Output() setAverage = new EventEmitter<number>();

  averageValue = 0;
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';
  isEditing = false;

  result = [];
  labels = [];

  obj = {};

  options: any = {
    legend: {
      position: 'right',
      labels: {
        fontColor: 'white',
        fontSize: 16
      }
    },
  };

  ngOnInit() {
    this.getValues();
  }

  ngOnChanges() {
    if (this.votes.vote.average) {
      this.averageValue = this.votes.vote.average;
    }
  }

  onEditAverage(value: number) {
    if (value !== this.averageValue) {
      this.setAverage.emit(value);
      this.averageValue = value;
      this.toggleEditing();
    }
  }

  toggleEditing() {
    if (this.currentUser.isAdmin) {
      this.isEditing = !this.isEditing;
    }
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  private getValues() {
    const average = this.votes.vote.average;

    this.obj = this.votes.data.reduce((acc, curr) => {
      if (!acc[curr.value]) {
        acc[curr.value] = 1;
      } else {
        acc[curr.value]++;
      }
      this.averageValue += curr.value;

      return acc;
    }, {});

    for (let item in this.obj) {
      let player = this.obj[item] > 1
        ? `${this.obj[item]} players`
        : `${this.obj[item]} player`;
      this.result.push((this.obj[item] / this.votes.data.length) * 100);
      this.labels.push(`${item} - (${player})`);
    }

    if (average) {
      this.averageValue = average;
    } else {
      this.averageValue /= this.votes.data.length;
    }

    this.doughnutChartLabels = this.labels;
    this.doughnutChartData.push(this.result);

    if (this.currentUser.isAdmin && !this.votes.vote.average) {
      this.setAverage.emit(this.averageValue);
    }
  }
}
