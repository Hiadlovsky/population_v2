import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from '../shared/loader/api-data.service';
import { VirtualTimeScheduler } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-life-expectancy',
  templateUrl: './life-expectancy.component.html',
  styleUrls: ['./life-expectancy.component.css'],

  animations: [trigger('paragraphState', [
    state('normal', style({transform: 'translateX(0) scale(1)'})),
    state('large', style({transform: 'translateX(0) scale(1.5)'})),
    transition('normal <=> large', animate(1000)),
  ])],
})
export class LifeExpectancyComponent implements OnInit {
  lifeExpectancy = null;
  state = 'normal';

  constructor(private apiDataService: ApiDataService, private route: ActivatedRoute ) { }

  ngOnInit() {
    console.log(this.route.snapshot.routeConfig.path); // test of path

    this.apiDataService.formSelector.next(this.route.snapshot.routeConfig.path);

    this.apiDataService.returnData.subscribe(data => {
      this.lifeExpectancy = data.toFixed(2);
      console.log(data);
      console.log(data.toFixed(2));
      console.log(this.state);
      this.state =  'large';
      console.log(this.state);
      // this.state =  'normal';
      console.log(this.state);
      if (this.state === 'large') {
        setTimeout( () => {
          this.state = 'normal';
        }, 1000);
      }
    });
  }

}
