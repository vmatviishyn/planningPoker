import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent implements OnInit {
  @Input() votes: any;

  doughnutChartLabels: Label[] = ['1', '2', '3'];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';
  averageValue = 0;

  result = [];
  obj = {};

  private options: any = {
    legend: { position: 'right' }
  }

  constructor() { }

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
    // this.votes.forEach(field => {
    //   // this.doughnutChartData[0].push(field.value);
    //   // this.doughnutChartLabels.push(field.secondaryText);



    //   this.averageValue += field.value;
    // });

    this.obj = this.votes.reduce((acc, curr) => {
      if (!acc[curr]) {
        acc[curr] = 1;
      } else {
        acc[curr]++;
      }
      return acc;
    }, {});

    for (let item in this.obj) {
      this.result.push((this.obj[item] / this.votes.length) * 100);
    }

    this.doughnutChartData.push(this.result);

    // this.averageValue /= this.votes.length;
  }
}
