import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../servicios/inventory.service';
import { HttpClient } from '@angular/common/http';
import { Inventory } from '../interfaces/inventory';
import { Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './inventory-home.component.html',
  styleUrls: ['./inventory-home.component.css']
})
export class InventoryHomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  inventories: Inventory[];
  rootInventory = '';
  constructor(private inventoryService: InventoryService, private router: Router, private httpClient: HttpClient) {

    httpClient.get(this.API_ENDPOINT + 'inventory')
      .subscribe((data: Inventory[]) => {
        this.inventories = data; //Se debe acceder al arreglo de este modo, oAngular lo reconocera como un objeto del tipo Post
        console.log(this.inventories);
      });
  }
  ngOnInit() {
  }
  delete(id) {
    this.inventoryService.delete(id).subscribe((data) => {
      alert('Inventario eliminado');
      window.location.reload();
    }, (error) => {
      console.log(error);
    });
  }
  findinventory(inventoryOne) {
    this.rootInventory = inventoryOne;
    console.log(this.rootInventory);
  }
  add(){
    this.router.navigate(["/inventory-form"]);
  }
}