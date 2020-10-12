import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../servicios/product-category.service';
import { HttpClient } from '@angular/common/http';
import { Product_Category } from '../interfaces/product-category';
@Component({
  selector: 'app-home',
  templateUrl: './product-category-home.component.html',
  styleUrls: ['./product-category-home.component.css']
})
export class ProductCategoryHomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  product_category: Product_Category[];
  rootProductCategory = '';
  constructor(private productcategoryService: ProductCategoryService, private httpClient: HttpClient) {

    httpClient.get(this.API_ENDPOINT + 'product_category')
      .subscribe((data: Product_Category[]) => {
        this.product_category = data; //Se debe acceder al arreglo de este modo, oAngular lo reconocera como un objeto del tipo Post
        console.log(this.product_category);
      });
  }

searchTerm6 = '';

  ngOnInit() {
  }
  delete(id) {
    this.productcategoryService.delete(id).subscribe((data) => {
      alert('Categoria de producto eliminada');
      window.location.reload();
    }, (error) => {
      console.log(error);
    });
  }
  findproductcategory(productcategoryOne) {
    this.rootProductCategory = productcategoryOne;
    console.log(this.rootProductCategory);
  }
}