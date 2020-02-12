import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiDataService } from '../shared/loader/api-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { LifeExpectancyRequestModel } from '../shared/life-expectancy-request.model';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  countries: string[] = [];
  years: number[] = [];
  loaded = false;
  pageName = null;
  populationForm: FormGroup;
  formSelector: string;
  lifeExpectancyForm: FormGroup;
  genders = ['male', 'female'];
  date: string;
  requestError = null;




  constructor(private apiData: ApiDataService) { }

  ngOnInit() {
    this.loaded = true;
    this.yearsGenerator();
    this.getDate();
    this.apiData.getCountries().subscribe(responseData => {
      this.countries = responseData;
      this.loaded = false;
    });

    this.populationForm = new FormGroup({
          country : new FormControl(null, Validators.required),
          year : new FormControl(null, Validators.required),
          ageFrom : new FormControl(null, [Validators.required, this.ageValidator]),
          ageTo : new FormControl(null, [this.ageValidator]),
    });
    this.lifeExpectancyForm = new FormGroup({
          country: new FormControl(null, Validators.required),
          gender: new FormControl('male'),
          age: new FormControl(null, [Validators.required, this.ageValidator])
    });
    // selecting the form
    this.apiData.formSelector.subscribe(data => {
      this.formSelector = data;
    });
    // error life expectancy catch
    this.apiData.error.subscribe(errorMessage => {
      this.requestError = errorMessage;
    });
  }

  onSubmit() {
    // To get Population
    if (this.formSelector !== 'expectancy') {
      // if just start added
      if (this.populationForm.value.ageTo === null) {
        this.populationForm.patchValue({ageTo: this.populationForm.value.ageFrom });
      }
      // check if start is greater then end age.
      if (this.populationForm.value.ageFrom > this.populationForm.value.ageTo  ) {
        console.log(this.populationForm.value.ageTo);
        alert(`The starting age can't be less the ending age!`);
        this.populationForm.patchValue({ageTo: this.populationForm.value.ageFrom });
      // else send data
      } else {
        this.apiData.getSelectedAgeCountryPopulation(this.populationForm.value);
      }
    // To get life expectancy
    } else {
      const lifeExpectancyRequest = new LifeExpectancyRequestModel(
        this.lifeExpectancyForm.value.gender,
        this.lifeExpectancyForm.value.country,
        this.date,
        this.lifeExpectancyForm.value.age
      );
      this.apiData.getLifeExpectancy(lifeExpectancyRequest);
      this.lifeExpectancyForm.reset();
      this.lifeExpectancyForm.patchValue({
        gender: 'male',
      });
    }
  }

  yearsGenerator() {
    for (let i = 1950; i <= 2100; i++) {
      this.years.push(i);
    }
  }
  ageValidator(control: FormControl): { [s: string]: boolean} {
    if (control.value < 0 || control.value > 100 ) {
      return {'Invalid NUmber' : true};
    } else {
      return null;
    }

  }
  getDate() {
    const today = new Date();
    const currentDay = String(today.getDate()).padStart(2, '0');
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const currentYear = today.getFullYear();
    this.date = `${currentYear}-${currentMonth}-${currentDay}`;
  }
  ngOnDestroy() {

  }

}
