import { Component, OnInit } from '@angular/core';
import { LotService } from '../servicios/lot.service';
import { HttpClient } from '@angular/common/http';
import { Lot } from '../interfaces/lot';

@Component({
  selector: 'app-lot-home',
  templateUrl: './lot-home.component.html',
  styleUrls: ['./lot-home.component.css']
})
export class LotHomeComponent implements OnInit {

  API_ENDPOINT = 'http://localhost:3000/';
  lot: Lot[];
  constructor(
    private lotService: LotService,
    private httpClient: HttpClient
  ) {
    this.lotService.getLot()
      .subscribe((data: Lot[]) => {
        this.lot = data;
        console.log(this.lot);
      });
  }
  ngOnInit(): void {
  }
  delete(id) {
    this.lotService.delete(id).subscribe((data) => {
      alert('Lot eliminado');
      window.location.reload();
    }, (error) => {
      console.log(error);
    });
  }
}

