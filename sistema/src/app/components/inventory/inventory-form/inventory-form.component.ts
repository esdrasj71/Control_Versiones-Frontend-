import { Component, OnInit } from '@angular/core';
import { Inventory } from '../interfaces/inventory';

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
    Presentation_Id: null,
    Product_Id: null,
  };

  constructor() { }

  ngOnInit(): void {
    //this.tipoService.getTipo().subscribe((data: Tipo) => {
      //return this.tipo = data['data'];
    }

  saveInventory(){
      console.log(this.inventory);
    }
   
}
