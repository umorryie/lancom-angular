import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'WeatherContainer',
  templateUrl: './weathercontainer.component.html',
  styleUrls: ['./weathercontainer.component.scss']
})

@Injectable()
export class WeatherContainerComponent {
  currentCity: CurrentWeather;
  daysValues: string[];
  city: string;
  loader: boolean;
  date: InformationTime;
  reload = faRedo;
  tempValues: number[];
  constructor(private http: HttpClient){
    this.loader = true;
    this.date = {} as InformationTime;
    this.currentCity = {} as CurrentWeather;
    this.city = "";
    this.getData('');
    this.changeValues();
  }

  getData(location: string) {
    this.loader = true;
    this.http.get("http://localhost:8000/maribor")
      .subscribe((data:any) => {
        console.log(data.list);
        let temperature = [];
        let index = 0;
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
        this.loader = false;
      });
  }

  getDateInDays(): string{
    return `${this.date.day}.${this.date.month}.${this.date.year}`;
  }

  getDateInHours(): string{
    return `${this.date.hour}.${this.date.min}`;
  }

  changeValues(){
    this.http.get("http://localhost:8000/products")
      .subscribe((data:any) => {
        
        let temperature = [];
        let days = []
        let index = 0;
      data.forEach(i=>{
        console.log(i);
        if(index !== 0 && index < 6){
          temperature.push(Math.round((i[0].temperature - 272.15) * 10) / 10);
          days.push(i[0].date.substring(5,10));
          console.log(i[0].date.substring(5,10),"DAn");
        }
        index++;
      });
      this.tempValues=temperature;
      this.daysValues = days;
      console.log(temperature,"temper");
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

interface InformationTime {
  year: number;
  min: number;
  hour: number;
  month: number;
  day: number;
};