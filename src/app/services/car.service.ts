import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { CarDetailDto } from '../models/carDetailDto';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl1="https://localhost:44344/api/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl1+"Car/getall"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandsId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl1+"Car/getcarsbybrandid?brandsId="+brandsId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl1+"Car/getcarsbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByCar(carId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl1 + 'Car/getcardetailsbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getById(carId:number):Observable<ListResponseModel<Car>> {
    let newPath=this.apiUrl1+"Car/getbyid?id="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetailsByCarId(carId:number):Observable<ListResponseModel<CarDetailDto>>{
    let carDetailPath=this.apiUrl1+"Car/getbyid?id="+carId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(carDetailPath);
  }

  getCarsDetailByBrandAndColorId(colorId:number,brandId:number):Observable<ListResponseModel<CarDetailDto>>{
    let newPath = this.apiUrl1 +"Cars/GetCarDetailsByColorAndByBrand?colorId="+colorId+ "&brandId=" +brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
  }

}
