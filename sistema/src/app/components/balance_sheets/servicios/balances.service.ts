import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Balance} from '../interfaces/balance';

@Injectable({
  providedIn: 'root'
})
export class BalancesService {
  API_ENDPOINT = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { 

  }

  consultar(balance: Balance){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'balance', balance, { headers: headers });
  }
}
