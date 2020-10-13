import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inventory } from '../interfaces/inventory';
import { Lot } from '../../lot/interfaces/lot';
import { LotService } from '../../lot/servicios/lot.service';
import { InventoryService } from '../servicios/inventory.service';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css']
})
export class InventoryFormComponent implements OnInit {
  inventory: Inventory = {
    Stock: null,
    Unit_Price: null,
    Retail_Price: null,
    Wholesale_Price: null,
    Status: null,
    Lot_Id: null,
  };
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false;
  inventoryarr: Inventory[];
  //Product
  selectedProductId: number;
  lot: Lot[];

  constructor(private inventoryService: InventoryService, private productsService: LotService, private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'inventory').subscribe((data: Inventory[]) => {
        this.inventoryarr = data;
        console.log(this.inventoryarr);
        this.inventory = this.inventoryarr.find((m) => { return m.Inventory_Id == this.id });
        this.selectedProductId = this.inventory.Lot_Id;
      }, (error) => {
        console.log(error);
      });
    }
    else {
      this.editing = false;
    }
    httpClient.get(this.API_ENDPOINT + 'lot')
      .subscribe((data: Lot[]) => {
        this.lot = data;
      })
  }

  ngOnInit() {

  }
  saveInventory() {
    if (this.editing) {
      this.inventory.Lot_Id = this.selectedProductId;
      this.inventoryService.put(this.inventory).subscribe((data) => {
        alert('Inventario actualizado');
        this.router.navigate(["/inventory-home"]);
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
    else {
      this.inventory.Lot_Id = this.selectedProductId;
      this.inventoryService.save(this.inventory).subscribe((data) => {
        alert('Inventario guardado');
        this.router.navigate(["/inventory-home"]);
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
