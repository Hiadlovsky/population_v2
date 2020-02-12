import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopulationTableComponent } from './population-table/population-table.component';
import { PopulationChartComponent } from './population-chart/population-chart.component';
import { LifeExpectancyComponent } from './life-expectancy/life-expectancy.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRouts: Routes = [
  {path: '', redirectTo: 'table', pathMatch: 'full'},
  {path: 'table', component: PopulationTableComponent},
  {path: 'chart', component: PopulationChartComponent},
  {path: 'expectancy', component: LifeExpectancyComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRouts),
  ],
  exports: [
    RouterModule
  ]

})

export class AppRoutingModule {

}

