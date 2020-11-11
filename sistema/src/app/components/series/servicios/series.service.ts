import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Series} from '../interfaces/serie';
@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  API_ENDPOINT = 'http://localhost:3000/'
  series: Series[];
  constructor(private httpClient: HttpClient) { 

  }

  getSeries(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.get(this.API_ENDPOINT + 'seriess', {headers});
  }

  saveSeries(serie: Series ){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'series', serie, {headers: headers});
  }
}
