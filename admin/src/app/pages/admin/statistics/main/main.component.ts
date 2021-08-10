import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    {
      data: [30, 59, 40, 50, 35, 25, 40],
      label: 'Series A',
      borderWidth: 4,
      borderColor: 'rgba(66, 148, 44, 0.9)',
      backgroundColor: 'rgba(66, 148, 44, 0.9)',
      hoverBackgroundColor: 'rgba(66, 34, 112, 0.9)',
    },
  ];
  public lineChartLabels: Label[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  public lineChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Historic Stocj price',
    },
    pan: {
      enabled: true,
      mode: 'xy',
    },
    zoom: {
      enabled: true,
      mode: 'xy',
    },
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: '#ff00ff',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  // BarChar Data
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [
    'Apple',
    'Banana',
    'Kiwifruit',
    'Blueberry',
    'Orange',
    'Grapes',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' },
  ];

  // Doughnut Chart Example
  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = [[55, 25, 20]];
  doughnutChartType: ChartType = 'doughnut';

  constructor() {}

  ngOnInit(): void {}
}
