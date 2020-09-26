import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Brands} from '../interfaces/brand';
@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  
  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {

   }
   save(brand: Brands){
     const headers = new HttpHeaders({'Content-Type': 'application/json'});
     return this.httpClient.post(this.API_ENDPOINT + 'brands', brand, {headers: headers});
   }
   findbrand(brand: Brands){
     const headers = new HttpHeaders({'Content-Type': 'application/json'});
     return this.httpClient.get(this.API_ENDPOINT + 'brands/:brandId')
   }
}

