import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Product_Category} from '../interfaces/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  
  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {

   }

  save(product_category: Product_Category){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + 'product_category', product_category, {headers: headers});
  }
}
