import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  constructor(private httpClient:HttpClient) { }
  apiUrl1="https://localhost:44344/api/";
  
  getByCarId(carsId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl1+"CarImages/getbycarid?carId="+carsId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
