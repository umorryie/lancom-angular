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
  constructor(private http: HttpClient) {
    this.loader = true;
    if (localStorage.getItem('DaysForChart')) {
      this.daysValues = JSON.parse(localStorage.getItem('DaysForChart'));
    }
    if (localStorage.getItem('city')) {
      this.city = localStorage.getItem('city');
    } else {
      this.city = "";
    }
    if (localStorage.getItem('currentCity')) {
      this.currentCity = JSON.parse(localStorage.getItem('currentCity'));
    } else {
      this.currentCity = {} as CurrentWeather;
    }
    if (localStorage.getItem('date')) {
      this.date = JSON.parse(localStorage.getItem('date'));
    } else {
      this.date = {} as InformationTime;
    }
    if (localStorage.getItem('temperatureByDaysForChart')) {
      this.tempValues = JSON.parse(localStorage.getItem('temperatureByDaysForChart'));
    }
    this.getData('');
    this.changeValues();
    this.loader = false;
  }

  getData(location: string) {
    this.loader = true;
    this.http.get("http://localhost:8000/maribor")
      .subscribe((data: any) => {
        let temperature = [];
        let index = 0;
        this.city = "Maribor";
        this.currentCity = data;
        var dt = new Date();
        this.date = {
          year: dt.getFullYear(),
          min: dt.getMinutes(),
          hour: dt.getHours(),
          month: dt.getMonth() + 1,
          day: dt.getDate(),

        }
        this.loader = false;
        localStorage.setItem("currentCity", JSON.stringify(data));
        localStorage.setItem("date", JSON.stringify(this.date));
        localStorage.setItem("city", 'Maribor');
      });
  }

  getYourData() {
    this.loader = true;
    let long: number;
    let lat: number;
    navigator.geolocation.getCurrentPosition((data) => {
      console.log(data.coords.longitude);
      long = data.coords.longitude;
      lat = data.coords.latitude;
      console.log("LAAT","LONG", lat, long)
      this.http.post<any>("http://localhost:8000/location", {
      lat,
      long,
    })
      .subscribe((data: any) => {
        console.log(data);
        console.log("DAAAJMO");
        this.city = data.name;
        let temperature = [];
        let days = []
        let index = 0;
        data.informacije.forEach(i => {
          console.log(i);
          if (index !== 0 && index < 6) {
            temperature.push(Math.round((i[0].temperature - 272.15) * 10) / 10);
            days.push(i[0].date.substring(5, 10));
            console.log(i[0].date.substring(5, 10), "DAn");
          }
          index++;
        });
        this.tempValues = temperature;
        this.daysValues = days;
        var dt = new Date();
        this.date = {
          year: dt.getFullYear(),
          min: dt.getMinutes(),
          hour: dt.getHours(),
          month: dt.getMonth() + 1,
          day: dt.getDate(),

        }
        this.loader = false;
        localStorage.setItem("currentCity", JSON.stringify(data));
        localStorage.setItem("date", JSON.stringify(this.date));
        localStorage.setItem("city", 'Maribor');
        this.loader = false;
      });
    }, ()=>{
      window.alert("Ne podpiraš Geolocation API-ja. Ne moremo dobiti informacij o tvoji lokaciji.")
    });
    console.log(long,lat,"TO JE TO");
    
  }

  getDateInDays(): string {
    return `${this.date.day}.${this.date.month}.${this.date.year}`;
  }

  getDateInHours(): string {
    return `${this.date.hour}.${this.date.min}`;
  }

  changeValues() {
    this.http.get("http://localhost:8000/products")
      .subscribe((data: any) => {

        let temperature = [];
        let days = []
        let index = 0;
        data.forEach(i => {
          console.log(i);
          if (index !== 0 && index < 6) {
            temperature.push(Math.round((i[0].temperature - 272.15) * 10) / 10);
            days.push(i[0].date.substring(5, 10));
            console.log(i[0].date.substring(5, 10), "DAn");
          }
          index++;
        });
        this.tempValues = temperature;
        this.daysValues = days;
        localStorage.setItem("temperatureByDaysForChart", JSON.stringify(temperature));
        localStorage.setItem("DaysForChart", JSON.stringify(days));
        console.log(temperature, "temper");
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
  name: string;
  informacije:any;
};

interface InformationTime {
  year: number;
  min: number;
  hour: number;
  month: number;
  day: number;
};