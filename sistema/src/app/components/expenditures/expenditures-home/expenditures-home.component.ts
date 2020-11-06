import { Component, OnInit } from '@angular/core';
import { ExpendituresService } from '../servicios/expenditures.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expenditures } from '../interfaces/expenditures';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expenditures-home',
  templateUrl: './expenditures-home.component.html',
  styleUrls: ['./expenditures-home.component.css']
})
export class ExpendituresHomeComponent implements OnInit {

  API_ENDPOINT = 'http://localhost:3000/';
  expenditures: Expenditures[];
  constructor(private expendituresService: ExpendituresService, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    httpClient.get(this.API_ENDPOINT + 'expenditures', { headers })
      .subscribe((data: Expenditures[]) => {
        this.expenditures = data;
      })
  }
  searchTermExpenditures = '';
  //empresa
  empresa: any = [];
  ngOnInit() {
    this.expendituresService.getempresa().subscribe((data) => {
      this.empresa = data[0];
      return this.empresa;
    })
  }
  delete(Expenditures_Id) {
    console.log(Expenditures_Id);
    this.expendituresService.delete(Expenditures_Id).subscribe(
      (data) => {
        Swal.fire('Egreso Eliminado', '', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' })
      }
    );
  }
}
