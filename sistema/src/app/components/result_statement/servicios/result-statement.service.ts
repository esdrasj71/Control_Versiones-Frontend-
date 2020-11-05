import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResultStatement } from '../interfaces/result_statement';

@Injectable({
  providedIn: 'root'
})
export class ResultStatementService {
  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) { 

  }

  saveresultStatement(resultStatement: ResultStatement){
    console.log(resultStatement);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'estadoresultado', resultStatement, {headers: headers});
  }
  
}
