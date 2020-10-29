import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Procedure_AccountsReceivable} from '../interfaces/procedure_accounts_receivable';

@Injectable({
  providedIn: 'root'
})
export class ProcedureAccountsreceivableService {
  API_ENDPOINT = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {

   }

   saveprocedure(procedure_accountsReceivable: Procedure_AccountsReceivable){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});

    return this.httpClient.post(this.API_ENDPOINT + 'procedure_cuentas_cobrar', procedure_accountsReceivable, {headers: headers});
   }
}
