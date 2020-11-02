import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'fivedayforecast',
  templateUrl: './fivedayforecast.component.html',
  styleUrls: ['./fivedayforecast.component.css']
})

@Injectable()
export class FiveDayForecastComponent {
  fireDayForeCast: ForeCast[];
  loader: boolean;
  constructor(private http: HttpClient) {
    this.loader = false;
  }

  getData(location: string) {
    this.loader = true;
    this.http.get("http://localhost:8000/products")
      .subscribe((data:ForeCast[]) => {
        this.fireDayForeCast = data;
        this.loader = false;
      });
  }
}

interface ForeCast {
  day: string;
  temperature: string;
  date: string;
  description: string;
  icon: any;
};