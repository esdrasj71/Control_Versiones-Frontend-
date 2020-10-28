import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Products } from '../interfaces/product';
import { Procedure_SaveProduct} from '../interfaces/procedure_saveproduct';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_ENDPOINT = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {

  }
  saveprocedure(procedure_product: Procedure_SaveProduct) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'procedure_product', procedure_product, { headers: headers });
  }
  saveproduct(product: Products) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'product', product, { headers: headers });
  }
  getProduct() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.get(this.API_ENDPOINT + 'product', { headers });
  }
  getProductsId(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.get(this.API_ENDPOINT + 'product/' + id, { headers: headers });
  }
  put(product) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.put(this.API_ENDPOINT + 'product/' + product.Product_Id
      , product, { headers: headers });
  }

  delete(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.delete(this.API_ENDPOINT + 'product/' + id, { headers: headers });
  }

}
