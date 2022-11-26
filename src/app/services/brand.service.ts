import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { Car } from '../models/car';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl="https://localhost:44344/api/";
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+'Brand/getall');
    };
  getCarsByBrand(brandsId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"Car/getcarsbybrandid?brandsId="+brandsId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

}
