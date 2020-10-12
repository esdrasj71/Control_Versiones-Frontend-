import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../interfaces/product'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_ENDPOINT = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {

  }
  saveproduct(product: Products) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.API_ENDPOINT + 'product', product, { headers: headers });
  }
  getProduct() {
    return this.httpClient.get(this.API_ENDPOINT + 'product');
  }
  getProductsId(id) {
    return this.httpClient.get(this.API_ENDPOINT + 'product/' + id);
  }
  put(product) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json' });
    return this.httpClient.put(this.API_ENDPOINT + 'product/' + product.Product_Id
      , product, { headers: headers });
  }

  delete(id) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json' });
    return this.httpClient.delete(this.API_ENDPOINT + 'product/' + id, { headers: headers });
  }

}
