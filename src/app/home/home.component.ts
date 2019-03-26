import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay, flatMap, map, retryWhen, tap } from 'rxjs/operators';

import { CarShow } from '../../models/car-show';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  API = 'http://localhost:3000/api';
  carShows: CarShow[];

  constructor(public http: HttpClient) { }

  ngOnInit() {
    let count = 0;
    const req = this.http.get<any>(`${this.API}/cars`);

    const subscription = req
      .pipe(
        tap(() => console.log("HTTP request executed")),
        map((res) => {
          if (res == "") {
            console.log('empty response', res);
            throw count++;    //error will be picked up by retryWhen
          } else
            return res;
        }),
        retryWhen(errors => {
          return errors.pipe(
            delay(500),
            flatMap(count => count == 3 ? throwError("giving up") : of(count)),
            tap(() => console.log('retrying...'))
          )
        })
      )
      .subscribe(
        res => {
          this.carShows = res;
          console.log("HTTP request success")
        },
        err => {
          this.carShows = [];
          subscription.unsubscribe();               // hide content loader animation
          console.error('HTTP Error', err)
        },
        () => {
          subscription.unsubscribe();
          console.log('HTTP request completed.')
        }
      );
  }


}
