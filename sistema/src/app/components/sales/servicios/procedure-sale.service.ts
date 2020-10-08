import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Procedure_Sale} from '../interfaces/procedure-sale';

@Injectable({
  providedIn: 'root'
})
export class ProcedureSaleService {
  API_ENDPOINT = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }
  save(procedure_sale: Procedure_Sale){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + 'procedure_sale', procedure_sale, {headers: headers});
  }
}
