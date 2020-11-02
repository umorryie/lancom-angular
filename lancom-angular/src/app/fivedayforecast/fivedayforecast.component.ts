import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'fivedayforecast',
  templateUrl: './fivedayforecast.component.html',
  styleUrls: ['./fivedayforecast.component.css']
})

@Injectable()
export class FiveDayForecastComponent {

    constructor(private http: HttpClient){
        
    }

    getData(location: string){
      return "data";
    }
}

interface ForeCast{
  day: string;
  temperature: string;
  date: string;
  description: string;
  icon: any;
};