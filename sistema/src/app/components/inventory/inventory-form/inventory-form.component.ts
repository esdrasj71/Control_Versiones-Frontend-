import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inventory } from '../interfaces/inventory';
import { Products } from '../../product/interfaces/product';
import { Presentation } from '../../presentation/interfaces/presentation'
import { ProductsService } from '../../product/servicios/products.service';
import { PresentacionService } from '../../presentation/servicios/presentacion.service';
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
    Product_Id:  null,
  };
  //Product
  filtrado_product = '';
  product_select: any[];
  product: Products[];
 
  //Presentation
  filtrado_presentation = '';
  presentation_select: any[];
  presentation: Presentation[];

  constructor(private productsService: ProductsService, private presentacionService: PresentacionService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
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
   this.inventory.Product_Id = this.product_select[0].Product_Id;
   console.log(this.inventory);
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
