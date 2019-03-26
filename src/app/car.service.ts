import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay, flatMap, map, retryWhen, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  API = 'http://localhost:3000/api/v1'; //local node server api url

  constructor(private http: HttpClient) { }

  getCarShows() {
    let retryCount = 0;
    const req = this.http.get<any>(`${this.API}/cars`);

    return req
      .pipe(
        tap(() => console.log("HTTP request executed")),
        map((res) => {
          if (!res || res == "") {
            console.log('empty response', res);
            throw retryCount++;    //error will be picked up by retryWhen
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
  }
}
