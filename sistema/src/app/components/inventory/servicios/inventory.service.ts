import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventory } from '../interfaces/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  API_ENDPOINT = 'http://localhost:3000/';

  inventory=[];
  constructor(private httpClient: HttpClient) {
    httpClient.get(this.API_ENDPOINT + 'inventory')
      .subscribe((data: Inventory[]) => {
        this.inventory = data;
      });
   }


  save(inventory: Inventory) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json','accesstoken': localStorage.getItem('token') });
    return this.httpClient.post(this.API_ENDPOINT + 'inventory', inventory, { headers: headers });
  }

  put(inventory) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json','accesstoken': localStorage.getItem('token') });
    return this.httpClient.put(this.API_ENDPOINT + 'inventory/' + inventory.Inventory_Id
      , inventory, { headers: headers });
  }

  delete(id) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json','accesstoken': localStorage.getItem('token') });
    return this.httpClient.delete(this.API_ENDPOINT + 'inventory/' + id, { headers: headers });
  }

  getInventory() {
    const headers = new HttpHeaders({ 'ContentType': 'application/json','accesstoken': localStorage.getItem('token') });

    return this.httpClient.get(this.API_ENDPOINT + 'inventory',{ headers: headers });
  }
  getInventoryNoPerishable() {
    const headers = new HttpHeaders({ 'ContentType': 'application/json','accesstoken': localStorage.getItem('token') });

    return this.httpClient.get(this.API_ENDPOINT + 'inventoryNoPerishable',{ headers: headers });
  }
  getInventoryId(id) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json','accesstoken': localStorage.getItem('token') });

    return this.httpClient.get(this.API_ENDPOINT + 'inventory/' + id,{ headers: headers });
  }
}