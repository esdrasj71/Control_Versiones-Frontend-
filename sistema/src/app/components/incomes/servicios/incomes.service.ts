import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Incomes} from '../interfaces/income';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {
  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) { 

  }
  getIncomes() {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.get(this.API_ENDPOINT + 'incomes', {headers});
  }
}
