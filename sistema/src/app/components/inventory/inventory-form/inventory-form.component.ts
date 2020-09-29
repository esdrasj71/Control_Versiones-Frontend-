import { Component, OnInit } from '@angular/core';
import { Inventory } from '../interfaces/inventory';
import { Products} from 'src/app/components/product/interfaces/product';

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
  product: Products[];
  constructor() { }

  ngOnInit(): void {
    
    }

  saveInventory(){
      console.log(this.inventory);
    }
   
}
