import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';

import { CarService } from './car.service';


describe(`CarService`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        CarService
      ]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));


  it('should be created', () => {
    const service: CarService = TestBed.get(CarService);
    expect(service).toBeTruthy();
  });


  it(`should send an expected /cars request`, async(inject([CarService, HttpTestingController],
    (service: CarService, backend: HttpTestingController) => {
      service.getCarShows().subscribe();

      backend.expectOne((req: HttpRequest<any>) => {

        return req.url === service.API + '/cars'
          && req.method === 'GET';

      }, `GET from 'api/v1/cars'`);
    })));

});

