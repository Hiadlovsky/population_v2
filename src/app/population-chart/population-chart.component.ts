import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../shared/loader/api-data.service';
import { PopulationModel } from '../shared/population.model';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-population-chart',
  templateUrl: './population-chart.component.html',
  styleUrls: ['./population-chart.component.css']
})
export class PopulationChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{
      ticks: {
        beginAtZero: true
            }
    }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;


  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Females' },
    { data: [], label: 'Males' },
    { data: [], label: 'Total' },
  ];

  populationReturnArray: PopulationModel[] = [];
  currentYear: number;
  currentCountry: string;

  constructor(private apiDataService: ApiDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.apiDataService.monitoredDataArray.subscribe(data => {
      this.populationReturnArray = data;
      if ( this.populationReturnArray.length > 0) {
        const start = 0; // this.populationReturnArray[0].age;
        const end = this.populationReturnArray.length - 1;
        const females = [];
        const males = [];
        const total = [];

        this.barChartLabels = [];  // to reset charts
        this.currentYear = this.populationReturnArray[0].year;
        this.currentCountry = this.populationReturnArray[0].country;
        for (let i = start; i <= end; i++) {
          const age = this.populationReturnArray[i].age;
          const ageString = age.toString();
          this.barChartLabels.push(ageString);
          females.push(this.populationReturnArray[i].females);
          males.push(this.populationReturnArray[i].males);
          total.push(this.populationReturnArray[i].total);
        }
        this.barChartData[0].data = females;
        this.barChartData[1].data = males;
        this.barChartData[2].data = total;

      }

      // console.log(this.populationReturnArray); test
    });

    console.log(this.route.snapshot.routeConfig.path); // test of path

    this.apiDataService.formSelector.next(this.route.snapshot.routeConfig.path);

  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
