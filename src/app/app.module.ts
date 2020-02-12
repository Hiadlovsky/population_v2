import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing-module';
import { ChartsModule } from 'ng2-charts';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PopulationTableComponent } from './population-table/population-table.component';
import { PopulationChartComponent } from './population-chart/population-chart.component';
import { LifeExpectancyComponent } from './life-expectancy/life-expectancy.component';
import { FormComponent } from './form/form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoaderComponent } from './shared/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PopulationTableComponent,
    PopulationChartComponent,
    FormComponent,
    NotFoundComponent,
    LifeExpectancyComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    ClarityModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
