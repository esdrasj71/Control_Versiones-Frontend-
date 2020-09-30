import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { LotService } from '../servicios/lot.service';
import { HttpClient } from '@angular/common/http';
import { Lot } from '../interfaces/lot';
>>>>>>> fd3c8aacff47692532462eae2ac0b47f8c63fcd2

@Component({
  selector: 'app-lot-home',
  templateUrl: './lot-home.component.html',
  styleUrls: ['./lot-home.component.css']
})
export class LotHomeComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }

  ngOnInit(): void {
  }

}
=======
  API_ENDPOINT = 'http://localhost:3000/';
  lot: Lot[];
  constructor(
    private lotService: LotService,
    private httpClient: HttpClient
  ) {
    httpClient
      .get(this.API_ENDPOINT + 'lot')
      .subscribe((data: Lot[]) => {
        this.lot = data; 
        console.log(this.lot);
      });
  }
  ngOnInit() {}
  delete(id) {
    this.lotService.delete(id).subscribe(
      (data) => {
        alert('Lote Eliminado');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
 
>>>>>>> fd3c8aacff47692532462eae2ac0b47f8c63fcd2
