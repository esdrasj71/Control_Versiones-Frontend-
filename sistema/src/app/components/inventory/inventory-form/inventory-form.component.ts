import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventory } from '../interfaces/inventory';
import { Products } from '../../product/interfaces/product';
import { ProductsService } from '../../product/servicios/products.service';
import { InventoryService } from '../servicios/inventory.service';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router'; 
import Swal from 'sweetalert2';
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
    Lot_Id: null,
    Statuss: null,
  };
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false;
  inventoryarr: Inventory[];
  //Product
  selectedProductId: number;
  product: Products[];

  constructor(private inventoryService: InventoryService, private productsService: ProductsService, private router: Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json','accesstoken': localStorage.getItem('token') });
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'inventory',{headers}).subscribe((data: Inventory[]) => {
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
    httpClient.get(this.API_ENDPOINT + 'product', {headers})
      .subscribe((data: Products[]) => {
        this.product = data;
      })
  }

  ngOnInit() {

  }
  saveInventory() {
    if (this.editing) {
      this.inventory.Lot_Id = this.selectedProductId;
      this.inventoryService.put(this.inventory).subscribe((data) => {
        Swal.fire('Inventario Actualizado', '','success');
        this.router.navigate(["/inventory-home"]);
        console.log(data)
      }, (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
      });
    }
    else {
      this.inventory.Lot_Id = this.selectedProductId;
      this.inventoryService.save(this.inventory).subscribe((data) => {
        Swal.fire('Inventario Guardado', '','success');
        this.router.navigate(["/inventory-home"]);
        console.log(data)
      }, (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
      });
    }
  }
  searchProduct(filter: string, product) {
    filter = filter.toLocaleLowerCase();
    return (product.Complete.toLocaleLowerCase().indexOf(filter) > -1);
  }
}
