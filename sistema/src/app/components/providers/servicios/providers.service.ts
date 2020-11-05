import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Providers } from '../interfaces/providers';
@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  API_ENDPOINT = 'http://localhost:3000/';
  //providers:Providers[];
  providers: Providers[];
  constructor(private httpClient: HttpClient) {
    httpClient.get(this.API_ENDPOINT + 'providers')
      .subscribe((data: Providers[]) => {
        this.providers = data['data'];
      });
  }
  getProviders() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    //console.log(headers);
    return this.httpClient.get(this.API_ENDPOINT + 'providers', {headers});

  }
  getProvidersId(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.get(this.API_ENDPOINT + 'providers/' + id, {headers:headers});
  }

  save(providers: Providers) {
    console.log(providers);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'providers', providers, { headers: headers });
  }
  put(providers) { //Le llamaremos put para fines practicos
    const headers = new HttpHeaders({ 'ContentType': 'application/json','accesstoken': localStorage.getItem('token') }); //Esto se declara cuando hay una ruta que no sea get
    return this.httpClient.put(this.API_ENDPOINT + 'providers/' + providers.Providers_Id, providers, { headers: headers });
  }
  delete(id) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json','accesstoken': localStorage.getItem('token') });
    return this.httpClient.delete(this.API_ENDPOINT + 'providers/' + id, { headers: headers });
  }
  findproviders(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    return this.httpClient.get(this.API_ENDPOINT + 'providers/' + id, { headers: headers })
  }
}
