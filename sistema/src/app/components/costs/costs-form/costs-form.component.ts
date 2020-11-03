import { Component, OnInit } from '@angular/core';
import { Costs } from '../interfaces/costs';
import { CostsService } from '../servicios/costs.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-costs-form',
  templateUrl: './costs-form.component.html',
  styleUrls: ['./costs-form.component.css']
})
export class CostsFormComponent implements OnInit {
  costs: Costs = {
    Name: null,
  };
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false;
  costarr: Costs[];

  constructor(private costsService: CostsService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json', 'accesstoken': localStorage.getItem('token') });
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'costs', { headers }).subscribe((data: Costs[]) => {
        this.costarr = data;
        this.costs = this.costarr.find((m) => { return m.Cost_Id == this.id });
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }
  }

  ngOnInit(): void {
  }
  saveCosts() {
    if (this.editing) {
      this.costsService.put(this.costs).subscribe((data) => {
        alert('Costo actualizado');
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
    else {
      this.costsService.save(this.costs).subscribe((data) => {
        alert('Costo guardado');
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
  }
}
