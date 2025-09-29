// 代码生成时间: 2025-09-30 01:30:41
// Ionic Visual Chart App
// This application demonstrates how to create a simple chart visualization using Ionic framework and a chart library.

// Import necessary modules
import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-visual-chart',
  template: `<canvas baseChart [datasets]='chartData' [options]='chartOptions' [colors]='chartColors' [chartType]='chartType'></canvas>`,
  styles: [
    '.base-chart {
      width: 100%;
      height: 400px;
    }'
  ]
})
export class VisualChartAppComponent {
  // Chart type
  public chartType: string = 'bar';
  // Chart data
  public chartData: Array<any> = [
    {
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Series A'
    }
  ];
  // Chart options
  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        id: 'y-axis-1',
        type: 'linear',
        position: 'left',
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        id: 'x-axis-1',
        type: 'category',
        position: 'bottom',
        ticks: {
          autoSkip: false
        }
      }]
    }
  };
  // Chart colors
  public chartColors: Array<Color> = [{
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(255, 99, 132, 0.8)'
  }];

  // Constructor
  constructor() {
    // Initialize chart
    this.initChart();
  }

  // Initialize chart with sample data
  private initChart(): void {
    try {
      // Create a new Chart instance
      const ctx = document.getElementById('chartCanvas').getContext('2d');
      this.myChart = new Chart(ctx, {
        type: this.chartType,
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: this.chartData
        },
        options: this.chartOptions
      });
    } catch (error) {
      console.error('Error initializing chart: ', error);
    }
  }

  // Function to update chart data
  public updateChartData(newData: Array<any>): void {
    if (newData.length > 0 && newData[0].data) {
      this.chartData = newData;
    } else {
      console.error('Invalid data format for chart update.');
    }
  }

  // Function to change chart type
  public changeChartType(type: string): void {
    if (['bar', 'line', 'doughnut', 'pie', 'polarArea', 'bubble', 'scatter'].includes(type)) {
      this.chartType = type;
    } else {
      console.error('Unsupported chart type.');
    }
  }
}
