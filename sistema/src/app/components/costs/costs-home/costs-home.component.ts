import { Component, OnInit } from '@angular/core';
import { CostsService } from '../servicios/costs.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Costs } from '../interfaces/costs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-costs-home',
  templateUrl: './costs-home.component.html',
  styleUrls: ['./costs-home.component.css']
})
export class CostsHomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  costs: Costs[];

  constructor(private costsService: CostsService, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    httpClient.get(this.API_ENDPOINT + 'costs', { headers })
      .subscribe((data: Costs[]) => {
        this.costs = data;
      })
  }
  searchTermCosts = '';
  ngOnInit(): void {
  }
  delete(id) {
    this.costsService.delete(id).subscribe(
      (data) => {
        Swal.fire('Costo Eliminado', '','success');
        window.setTimeout(function(){location.reload()},2000)
      },
      (error) => {
        console.log(error); 
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
      }
    );
  }
}
