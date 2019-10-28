import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {
  @Input() votes: any;

  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';
  averageValue = 0;

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

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  private getValues() {
    this.obj = this.votes.reduce((acc, curr) => {
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
      this.result.push((this.obj[item] / this.votes.length) * 100);
      this.labels.push(`${item} - (${player})`);
    }

    this.averageValue /= this.votes.length;
    this.doughnutChartLabels = this.labels;
    this.doughnutChartData.push(this.result);
  }
}
