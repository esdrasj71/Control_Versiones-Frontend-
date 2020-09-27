import { Component, OnInit } from '@angular/core';
import {Product_Category } from '../interfaces/product-category';
import {ProductCategoryService} from '../servicios/product-category.service'
@Component({
  selector: 'app-product-category-form',
  templateUrl: './product-category-form.component.html',
  styleUrls: ['./product-category-form.component.css']
})
export class ProductCategoryFormComponent implements OnInit {
  product_category: Product_Category ={
    Name: null,
  };
  constructor(private productcategoryService: ProductCategoryService) {

   }

  ngOnInit(): void {
  }
  saveProductCategory(){
    console.log(this.product_category);
    this.productcategoryService.save(this.product_category).subscribe((data)=>{
      alert('Categoria de producto guardada');
      console.log(data)
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    })
  }
}
