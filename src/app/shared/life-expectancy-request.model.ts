export class LifeExpectancyRequestModel {

  public gender: string;
  public country: string;
  public date: string;
  public age: number;

  constructor(gender: string, country: string, date: string, age: number) {
    this.gender = gender;
    this.country = country;
    this.date = date;
    this.age = age;
  }

}
