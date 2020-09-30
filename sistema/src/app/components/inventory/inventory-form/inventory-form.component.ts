import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inventory } from '../interfaces/inventory';
import { Products } from '../../product/interfaces/product';
import { ProductsService } from '../../product/servicios/products.service';
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
  filtrado_product = '';
  product_select: any[];
  product: Products[];

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.productsService.getProduct().subscribe((data: Products[]) => {
      return this.product = data;
    })
  }

  saveInventory() {
    console.log(this.inventory);
  }
  getProductId(id) {
    this.productsService.getProductsId(id).subscribe((data: Products[]) => {
      this.product_select = data;
      return this.product_select = Array.of(this.product_select);
    });
  }
}
