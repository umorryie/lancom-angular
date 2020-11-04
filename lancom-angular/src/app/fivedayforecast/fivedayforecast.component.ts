import { Component, Injectable, OnInit, Input  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'fivedayforecast',
  templateUrl: './fivedayforecast.component.html',
  styleUrls: ['./fivedayforecast.component.css']
})

@Injectable()
export class FiveDayForecastComponent  implements OnInit {
  @Input() values: number[];
  @Input() days: string[];
  fiveDayForeCast: any;
  constructor(private http: HttpClient) {
    this.fiveDayForeCast = {};
    this.getData('');
  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels= [];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [];
  ngOnInit() {
  }

  getData(location: string) {
    this.http.get("http://localhost:8000/products")
      .subscribe((data:any) => {
        this.fiveDayForeCast = data;
        this.barChartData = [
          {data:this.values, label: "Temperatura zjutraj na določen dan"}
        ];
        this.barChartLabels = this.days;
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