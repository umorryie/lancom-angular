import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Component({
    selector: 'forecastgraph',
    templateUrl: './forecastgrapf.component.html',
    styleUrls: ['./forecastgrapf.component.css']
  })

  @Injectable()
export class ForecastGraphComponent {
  currentCity: CurrentWeather;
  constructor(private http: HttpClient){
    this.getData('');
  }

  getData(location: string) {
    this.http.get("http://localhost:8000/maribor")
      .subscribe((data:any) => {
        this.currentCity = data;
      });
  }
}

interface CurrentWeather {
  time: string;
  temp: string;
  maxTemp: string;
  minTemp: string;
  description: string;
  icon: any;
  wind: string;
};