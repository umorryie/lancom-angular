import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'WeatherContainer',
  templateUrl: './weathercontainer.component.html',
  styleUrls: ['./weathercontainer.component.css']
})

@Injectable()
export class WeatherContainerComponent {
  currentCity: CurrentWeather;
  city: string;
  loader: boolean;
  date: InformationTime;
  reload = faRedo;
  constructor(private http: HttpClient){
    this.loader = true;
    this.date = {} as InformationTime;
    this.currentCity = {} as CurrentWeather;
    this.city = "";
    this.getData('');
  }

  getData(location: string) {
    this.loader = true;
    this.http.get("http://localhost:8000/maribor")
      .subscribe((data:any) => {
        this.city = "Maribor";
        this.currentCity = data;
        var dt = new Date();
        this.date = {
          year: dt.getFullYear(),
          min: dt.getMinutes(),
          hour: dt.getHours(),
          month: dt.getMonth()+1,
          day: dt.getDate(),
          
        }
        //this.date = `${dt.getDate()}.${dt.getMonth()+1}.${dt.getFullYear()}`;
        this.loader = false;
      });
  }

  getDateInDays(): string{
    return `${this.date.day}.${this.date.month}.${this.date.year}`;
  }

  getDateInHours(): string{
    return `${this.date.hour}.${this.date.min}`;
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

interface InformationTime {
  year: number;
  min: number;
  hour: number;
  month: number;
  day: number;
};