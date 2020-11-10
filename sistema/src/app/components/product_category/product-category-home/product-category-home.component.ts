import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../servicios/product-category.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product_Category } from '../interfaces/product-category';
import Swal from 'sweetalert2';
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
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    httpClient.get(this.API_ENDPOINT + 'product_category', { headers })
    .subscribe((data: Product_Category[]) => {
        this.product_category = data; 
      });
  }

searchTerm6 = '';

  ngOnInit() {
  }
  delete(id) {
    this.productcategoryService.delete(id).subscribe((data) => {
        Swal.fire('Categoría de Producto Eliminado', '','success');
    }, (error) => {
      console.log(error);
      Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
    });
  }
  findproductcategory(productcategoryOne) {
    this.rootProductCategory = productcategoryOne;
  }
}