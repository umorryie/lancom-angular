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
  fireDayForeCast: any;
  loader: boolean;
  constructor(private http: HttpClient) {
    this.loader = false;
  }

  getData(location: string) {
    this.loader = true;
    this.http.get("http://localhost:8000/products")
      .subscribe((data:any) => {
        /*data.forEach(l=>{
          console.log("l",l);
          let novi = {date:[]}
          const asd = l.map(k=>new ForeCast(){day:"asd"})
        })*/
        this.fireDayForeCast = data;
        console.log(this.fireDayForeCast);
        this.loader = false;
      });
  }
}
interface Days{
  day: ForeCast[]
}
interface ForeCast {
  day: string;
  temperature: string;
  date: string;
  description: string;
  icon: any;
  wind: string;
};