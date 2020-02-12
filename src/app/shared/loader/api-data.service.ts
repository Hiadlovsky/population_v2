import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PopulationRequestModel } from '../population-request.model';
import { PopulationModel } from '../population.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { LifeExpectancyRequestModel } from '../life-expectancy-request.model';


@Injectable({providedIn: 'root'})
export class ApiDataService {
  populationReturnArray: PopulationModel[] = [];

  monitoredDataArray = new BehaviorSubject<PopulationModel[]>([]);
  formSelector = new Subject<string>();
  returnData = new Subject<any>();
  error = new Subject<string>();




  constructor(private http: HttpClient) {}

  getCountries() {
   return  this.http.get(`https://d6wn6bmjj722w.population.io:443/1.0/countries`).pipe(map(responseData => {
      const returnArr = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          returnArr.push(... responseData[key]);
        }
      }
      return returnArr;
    }));
  }

  getSelectedAgeCountryPopulation(requestData: PopulationRequestModel) {
    const start = requestData.ageFrom;
    const end = requestData.ageTo;
    if (this.populationReturnArray.length > 0) {
      this.populationReturnArray = [];
    }
    for (let i = start; i <= end; i++) {
      this.getSelectedYearCountry(i, requestData.year, requestData.country);

    }

  }

  sendDataToService() {
    this.monitoredDataArray.next(this.populationReturnArray);

  }

  private getSelectedYearCountry(requestAge: number, year: number, country: string ) {
      this.http.get(`https://d6wn6bmjj722w.population.io:443/1.0/population/${year}/${country}/${requestAge}/`).
      subscribe(data => {
       // console.log(data[0]); // console test if data are send
        this.populationReturnArray.push(data[0]);
        this.monitoredDataArray.next(this.populationReturnArray); // this works probably not good solution
      }, error => {
       console.log(error);
      });
  }

  getLifeExpectancy(lifeExpectancyModel: LifeExpectancyRequestModel) {
      this.http.get<{[key: string]: any}>(
       // tslint:disable-next-line: max-line-length
       `https://d6wn6bmjj722w.population.io:443/1.0/life-expectancy/remaining/${lifeExpectancyModel.gender}/${lifeExpectancyModel.country}/${lifeExpectancyModel.date}/${lifeExpectancyModel.age}y/`).
       subscribe(data => {
        this.returnData.next(data.remaining_life_expectancy);
       }, error => {
        alert(`Sorry there is no data on the server for this request. ${error.statusText}!!`);
       });

  }





}

