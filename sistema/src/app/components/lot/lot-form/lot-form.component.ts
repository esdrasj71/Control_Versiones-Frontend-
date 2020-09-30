import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { LotService } from '../servicios/lot.service';
import { HttpClient } from '@angular/common/http';
import { Lot } from '../interfaces/lot';
import { ActivatedRoute } from '@angular/router';
>>>>>>> fd3c8aacff47692532462eae2ac0b47f8c63fcd2

@Component({
  selector: 'app-lot-form',
  templateUrl: './lot-form.component.html',
  styleUrls: ['./lot-form.component.css']
})
export class LotFormComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }

  ngOnInit(): void {
  }

}
=======
  lot: Lot = {
    Lot_Id:null,
    Due_Date: null,
  }; //este arreglo define los campos que se van a ingresar en el formulario
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false; 
  postarr: Lot[]; 
  constructor(private lotService: LotService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.id = this.activatedRoute.snapshot.params['id']; //Este es el parametro que se definio en la ruta de app.module.ts
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'lot').subscribe((data: Lot[]) => { //Aqui traemos el arreglo completo de datos
        this.postarr = data;
        console.log(this.postarr);
        this.lot = this.postarr.find((m) => { return m.Lot_Id == this.id }); //Aqui traemos solo el id que nos interesa
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }
  }
  ngOnInit() {
  }
  savePost() {
    if (this.editing) {
      this.lotService.put(this.lot).subscribe((data) => { //El unico cambioes el put
        alert('Lote actualizado');
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
    else {
      console.log(this.lot);
      this.lotService.save(this.lot).subscribe((data) => {
        alert('Lote guardado');
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
  } 
}
 
>>>>>>> fd3c8aacff47692532462eae2ac0b47f8c63fcd2
