

export class PopulationModel {

  public females: number;
  public country: string;
  public age: number;
  public males: number;
  public year: number;
  public total: number;

  constructor(females: number, country: string, age: number, males: number, year: number, total: number) {
    this.females = females;
    this.country = country;
    this.age = age;
    this.males = males;
    this.year = year;
    this.total = total;
  }

}
