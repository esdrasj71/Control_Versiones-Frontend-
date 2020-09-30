import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Products} from '../interfaces/product'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_ENDPONT = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { 

  }
  saveproduct(product: Products){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPONT + 'product', product, {headers: headers});
  }
}
