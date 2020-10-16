import { Component, OnInit } from '@angular/core';
import { LotService } from '../servicios/lot.service';
import { HttpClient } from '@angular/common/http';
import { Lot } from '../interfaces/lot';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../product/interfaces/product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lot-form',
  templateUrl: './lot-form.component.html',
  styleUrls: ['./lot-form.component.css']
})
export class LotFormComponent implements OnInit {

  lot: Lot = {
    Lot_Id: null,
    Due_Date: null,
    Product_Id: null,
  }; //este arreglo define los campos que se van a ingresar en el formulario
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false;
  postarr: Lot[];
  products: Products[];
  selectedProductId: number;
  

  constructor(private lotService: LotService, private activatedRoute: ActivatedRoute, private router: Router,private httpClient: HttpClient) {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'lot').subscribe((data: Lot[]) => {
        this.postarr = data;
        console.log(this.postarr);
        this.lot = this.postarr.find((m) => { return m.Lot_Id == this.id });
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }

    httpClient.get(this.API_ENDPOINT + 'product')
      .subscribe((data: Products[]) => {
        this.products = data;
        console.log(this.products);
      })
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
      this.lot.Product_Id = this.selectedProductId;
      console.log(this.lot);
      this.lotService.save(this.lot).subscribe((data) => {
        alert('Lote guardado');
        this.router.navigate(["/lot-home"]);
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
  }
  searchProduct(filter: string, product) {
    filter = filter.toLocaleLowerCase();
    return (product.Complete.toLocaleLowerCase().indexOf(filter) > -1);
  }
}

