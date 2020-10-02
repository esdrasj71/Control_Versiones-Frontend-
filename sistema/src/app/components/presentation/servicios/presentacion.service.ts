import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Presentation } from '../interfaces/presentation';

@Injectable({
  providedIn: 'root'
})
export class PresentacionService {

  API_ENDPOINT = 'http://localhost:3000/';

  presentation = [];
  constructor(private httpClient: HttpClient) {
    httpClient.get(this.API_ENDPOINT + 'presentation')
      .subscribe((data: Presentation[]) => {
        this.presentation = data;
      });
  }
  getPresentation() {
    return this.httpClient.get(this.API_ENDPOINT + 'presentation');
  }
  getPresentationsId(id) {
    return this.httpClient.get(this.API_ENDPOINT + 'presentation/' + id);
  }
  save(presentation: Presentation) {
    console.log(presentation);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.API_ENDPOINT + 'presentation', presentation, { headers: headers });
  }
  put(presentation) { //Le llamaremos put para fines practicos
    const headers = new HttpHeaders({ 'ContentType': 'application/json' });
    return this.httpClient.put(this.API_ENDPOINT + 'presentation/' + presentation.Presentation_Id, presentation, { headers: headers });
  }
  delete(id) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json' });
    return this.httpClient.delete(this.API_ENDPOINT + 'presentation/' + id, { headers: headers });
  }

  findPresentation(presentation: Presentation) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get(this.API_ENDPOINT + 'presentation/:Presentation_Id')
  }
}
