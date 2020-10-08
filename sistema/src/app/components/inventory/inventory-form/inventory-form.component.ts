import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inventory } from '../interfaces/inventory';
import { Products } from '../../product/interfaces/product';
import { Presentation } from '../../presentation/interfaces/presentation'
import { ProductsService } from '../../product/servicios/products.service';
import { PresentacionService } from '../../presentation/servicios/presentacion.service';
import { InventoryService } from '../servicios/inventory.service';
import { ActivatedRoute } from '@angular/router';

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
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false;
  inventoryarr: Inventory[];
  //Product
  filtrado_product = '';
  product_select: any[];
  product: Products[];

  //Presentation
  filtrado_presentation = '';
  presentation_select: any[];
  presentation: Presentation[];

  constructor(private inventoryService: InventoryService, private productsService: ProductsService, private presentacionService: PresentacionService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'inventory').subscribe((data: Inventory[]) => {
        this.inventoryarr = data;
        console.log(this.inventoryarr);
        this.inventory = this.inventoryarr.find((m) => { return m.Inventory_Id == this.id });
      }, (error) => {
        console.log(error);
      });
    }
    else {
      this.editing = false;
    }
  }

  ngOnInit() {
    this.productsService.getProduct().subscribe((data: Products[]) => {
      return this.product = data;
    })
    this.presentacionService.getPresentation().subscribe((data: Presentation[]) => {
      return this.presentation = data;
    })
  }
  saveInventory() {
    //console.log(this.product_select[0].Product_Id);
   // console.log(this.presentation_select[0].Presentation_Id);
  
  //Agregar otro IF
  
  //
    if (this.editing) {
      console.log("Entran 2");
      this.inventoryService.put(this.inventory).subscribe((data) => {
        alert('Inventario actualizado');
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
    else {
      this.inventory.Product_Id = this.product_select[0].Product_Id;
      this.inventory.Presentation_Id = this.presentation_select[0].Presentation_Id;
      this.inventoryService.save(this.inventory).subscribe((data) => {
        alert('Inventario guardado');
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
  }

  getProductId(id) {
    this.productsService.getProductsId(id).subscribe((data: Products[]) => {
      this.product_select = data;
      return this.product_select = Array.of(this.product_select);

    });
  }

  getPresentationId(id) {
    this.presentacionService.getPresentationsId(id).subscribe((data: Presentation[]) => {
      this.presentation_select = data;
      return this.presentation_select = Array.of(this.presentation_select);
    });
  }
}
