import { Component, OnInit } from '@angular/core';
import { Product_Category } from '../interfaces/product-category';
import { ProductCategoryService } from '../servicios/product-category.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-category-form',
  templateUrl: './product-category-form.component.html',
  styleUrls: ['./product-category-form.component.css']
})
export class ProductCategoryFormComponent implements OnInit {
  product_category: Product_Category = {
    Product_Category_Id: null,
    Name: null,
  };
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false; 
  postarr: Product_Category[]; 
  constructor(private productcategoryService: ProductCategoryService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.id = this.activatedRoute.snapshot.params['id']; 
    if (this.id) {
      this.editing = true;
      this.productcategoryService.getCategory().subscribe((data: Product_Category[]) => { 
        this.postarr = data;
        console.log(this.postarr);
        this.product_category = this.postarr.find((m) => { return m.Product_Category_Id == this.id }); 
      }, (error) => {
        console.log(error);
      });
    }
    else {
      this.editing = false;
    }
  }
  ngOnInit() {
  }
  saveProductCategory() {
    if (this.editing) {
      this.productcategoryService.put(this.product_category).subscribe((data) => {
        Swal.fire('Categoría de Producto Actualizado', '','success');
        console.log(data)
      }, (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
      });
    }
    else {
      console.log(this.product_category);
      this.productcategoryService.save(this.product_category).subscribe((data) => {
        Swal.fire('Categoría de Producto Guardado', '','success');
        console.log(data)
      }, (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
      });
    }
  }
}