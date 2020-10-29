import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DebsPay } from '../interfaces/report3';
@Component({
  selector: 'app-debs-pay-home',
  templateUrl: './debs-pay-home.component.html',
  styleUrls: ['./debs-pay-home.component.css']
})
export class DebsPayHomeComponent implements OnInit {

  API_ENDPOINT = 'http://localhost:3000/';
  debs : DebsPay[]
  constructor(private httpClient: HttpClient) { 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    httpClient.get(this.API_ENDPOINT + 'purchase_report3', { headers })
      .subscribe((data: DebsPay[]) => {
        this.debs = data;
        console.log(this.debs);
      });
  }

  ngOnInit(): void {
  }

}
