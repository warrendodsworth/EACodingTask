import { Component, OnInit } from '@angular/core';

import { CarShow } from '../../models/car-show';
import { CarService } from '../car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  carShows: CarShow[];

  constructor(public _car: CarService) { }

  ngOnInit() {
    let subscription = this._car.getCarShows().subscribe(
      res => {
        this.carShows = res;
        console.log("HTTP request success")
      },
      err => {
        this.carShows = [];  // hide content loader animation & show error message
        subscription.unsubscribe();
        console.error('HTTP Error', err)
      },
      () => {
        subscription.unsubscribe();
        console.log('HTTP request completed.')
      }
    );
  }

}
