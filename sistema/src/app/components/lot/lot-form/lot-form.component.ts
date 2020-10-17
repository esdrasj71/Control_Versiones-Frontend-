import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LotService } from '../servicios/lot.service';
import { HttpClient } from '@angular/common/http';
import { Lot } from '../interfaces/lot';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../product/interfaces/product';
import { Router } from '@angular/router';
import { Inventory } from '../../inventory/interfaces/inventory';
import { InventoryService } from '../../inventory/servicios/inventory.service';
@Component({
  selector: 'app-lot-form',
  templateUrl: './lot-form.component.html',
  styleUrls: ['./lot-form.component.css']
})
export class LotFormComponent implements OnInit {
  @Output() Lot_Id = new EventEmitter<number>();
  lot: Lot = {
    Lot_Id: null,
    Due_Date: null,
    Product_Id: null,
  };
  inventory: Inventory = {
    Stock: 0,
    Unit_Price: 0,
    Retail_Price: 0,
    Wholesale_Price: 0,
    Lot_Id: null,
    Statuss: false,
  };
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false;
  postarr: Lot[];
  products: Products[];
  selectedProductId: number;

  constructor(private invetoryService: InventoryService, private lotService: LotService, private activatedRoute: ActivatedRoute, private router: Router, private httpClient: HttpClient) {
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
        //this.router.navigate(["/lot-home"]);
        this.Lot_Id.emit(data['id']);

        this.inventory.Lot_Id= data['id'];
        this.inventory.Statuss=false;

        console.log(this.inventory);
        this.invetoryService.save(this.inventory).subscribe((date) => {
          alert('Inventario guardado');
          console.log(date)
        });

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
