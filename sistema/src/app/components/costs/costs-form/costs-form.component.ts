import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Costs } from '../interfaces/costs';
import { CostsService } from '../servicios/costs.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-costs-form',
  templateUrl: './costs-form.component.html',
  styleUrls: ['./costs-form.component.css']
})
export class CostsFormComponent implements OnInit {
  @Output() Cost_Id = new EventEmitter<number>();
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
        Swal.fire('Costo Actualizado', '', 'success');
        console.log(data)
      }, (error) => {
        console.log(error);
        Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' })
      });
    }
    else {
      if (this.costs.Name == null) {
        Swal.fire({ icon: 'warning', title: 'Aviso!', text: 'Debe llenar todos los campos' });
      }
      else {
        this.costsService.save(this.costs).subscribe((data) => {
          Swal.fire('Costo Guardado', '', 'success');
          console.log(data)
          this.Cost_Id.emit(data['id']);
        }, (error) => {
          console.log(error);
          Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' })
        });
      }
    }
  }
}
