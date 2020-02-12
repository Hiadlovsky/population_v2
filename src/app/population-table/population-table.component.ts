import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../shared/loader/api-data.service';
import { PopulationModel } from '../shared/population.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-population-table',
  templateUrl: './population-table.component.html',
  styleUrls: ['./population-table.component.css']
})
export class PopulationTableComponent implements OnInit {
  populationReturnArray: PopulationModel[] = [];
  currentYear: number;
  currentCountry: string;

  constructor(private apiDataService: ApiDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.apiDataService.monitoredDataArray.subscribe(data => {
      this.populationReturnArray = data;
      if ( this.populationReturnArray.length > 0) {
        this.currentYear = this.populationReturnArray[0].year;
        this.currentCountry = this.populationReturnArray[0].country;
      }

      // console.log(this.populationReturnArray); test
    });
    console.log(this.route.snapshot.routeConfig.path); // test of path

    this.apiDataService.formSelector.next(this.route.snapshot.routeConfig.path);
  }

}
