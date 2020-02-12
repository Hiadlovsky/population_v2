

export class PopulationRequestModel {
  public year: number;
  public country: string;
  public ageFrom: number;
  public ageTo: number;

  constructor( year: number, country: string, ageFrom: number, ageTo: number  ) {
    this.year = year;
    this.country = country;
    this.ageFrom = ageFrom;
    this.ageTo = ageTo;

  }
}
