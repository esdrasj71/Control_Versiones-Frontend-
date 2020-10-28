import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_ENDPOINT = 'http://localhost:3000/';
  user:User[];
  constructor(private httpClient: HttpClient) { }
  getUsers() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get(this.API_ENDPOINT + 'user', {headers});

  }
  getUsersId(id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.get(this.API_ENDPOINT + 'user/' + id, {headers:headers});
  }

  save(user: User) {
    console.log(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    return this.httpClient.post(this.API_ENDPOINT + 'user', user, { headers: headers });
  }
  put(user) { //Le llamaremos put para fines practicos
    const headers = new HttpHeaders({ 'ContentType': 'application/json','accesstoken': localStorage.getItem('token') }); //Esto se declara cuando hay una ruta que no sea get
    return this.httpClient.put(this.API_ENDPOINT + 'user/' + user.User_Id, user, { headers: headers });
  }
  delete(id) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json','accesstoken': localStorage.getItem('token') });
    return this.httpClient.delete(this.API_ENDPOINT + 'user/' + id, { headers: headers });
  }
}
