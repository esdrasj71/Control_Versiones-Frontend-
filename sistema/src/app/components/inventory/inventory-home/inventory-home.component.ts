import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../servicios/inventory.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventory } from '../interfaces/inventory';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InventoryGroup } from '../interfaces/inventorygroup';

@Component({
  selector: 'app-home',
  templateUrl: './inventory-home.component.html',
  styleUrls: ['./inventory-home.component.css']
})
export class InventoryHomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  inventories: Inventory[];
  inventorygroup: InventoryGroup[];
  rootInventory = '';
  cont = 0;

  constructor(private inventoryService: InventoryService, private router: Router, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json','accesstoken': localStorage.getItem('token') });

    httpClient.get(this.API_ENDPOINT + 'inventory',{headers})
      .subscribe((data: Inventory[]) => {
        this.inventories = data; 
        console.log(this.inventories);
      });
  }
  ngOnInit() {
    this.inventoryService.getInventoryGroup().subscribe((data: InventoryGroup[]) => {
      this.inventorygroup = data;
      this.cont = this.inventorygroup.length;
    });
  }
  delete(id) {
    this.inventoryService.delete(id).subscribe((data) => {
        Swal.fire('Inventario Eliminado', '','success');
    }, (error) => {
      console.log(error);
      Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
    });
  }
  findinventory(inventoryOne) {
    this.rootInventory = inventoryOne;
    console.log(this.rootInventory);
  }
  add() {
    this.router.navigate(["/inventory-form"]);
  }
}