import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AccountsRecivable} from '../interfaces/accounts-receivable';

@Injectable({
  providedIn: 'root'
})
export class AccountsReceivableService {
  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {

   }
   saveAccountRecivable(accountsRecivable: AccountsRecivable){
     const headers = new HttpHeaders({'Content-Type': 'application/json'});
     return this.httpClient.post(this.API_ENDPOINT + 'accounts_receivable', accountsRecivable, {headers:headers});
   }
}
