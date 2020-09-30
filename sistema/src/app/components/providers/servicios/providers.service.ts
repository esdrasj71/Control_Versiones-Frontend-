import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Providers} from '../interfaces/providers';
@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  API_ENDPOINT = 'http://localhost:3000/';
  //providers:Providers[];
  providers=[];
  constructor(private httpClient: HttpClient) {
    httpClient.get(this.API_ENDPOINT + 'providers')
      .subscribe((data: Providers[]) => {
        this.providers = data;
      });
   }
   getProviders(){
    return this.httpClient.get(this.API_ENDPOINT + 'providers' );
  }
  
   save(providers: Providers){
     console.log(providers);
     const headers = new HttpHeaders({'Content-Type': 'application/json'});
     return this.httpClient.post(this.API_ENDPOINT + 'providers', providers, {headers: headers});
   }
   put(providers) { //Le llamaremos put para fines practicos
    const headers = new HttpHeaders({ 'ContentType': 'application/json' }); //Esto se declara cuando hay una ruta que no sea get
    return this.httpClient.put(this.API_ENDPOINT + 'providers/' + providers.Providers_Id
      , providers, { headers: headers }); //La ruta también se declara post por las rutasque se declararon en laravel
  }
  delete(id) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json' });
    return this.httpClient.delete(this.API_ENDPOINT + 'providers/' + id,{headers:headers});
  }
   /*findbrand(providers: Providers){
     const headers = new HttpHeaders({'Content-Type': 'application/json'});
     return this.httpClient.get(this.API_ENDPOINT + 'providers/:providersId')
   }*/
}
