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

  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [[]];
  doughnutChartType: ChartType = 'doughnut';
  averageValue = 0;

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
    this.votes.forEach(field => {
      this.doughnutChartData[0].push(field.value);
      this.doughnutChartLabels.push(field.secondaryText);
      this.averageValue += field.value;
    });

    this.averageValue /= this.votes.length;
  }
}
