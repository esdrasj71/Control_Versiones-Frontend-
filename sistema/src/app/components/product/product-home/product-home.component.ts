import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../servicios/products.service';
import { HttpClient } from '@angular/common/http';
import { Products } from '../interfaces/product';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  products: Products[]
  filtrado_product = '';
  constructor(private productsService: ProductsService, private router: Router, private httpClient: HttpClient) {
    this.productsService.getProduct()
      .subscribe((data: Products[]) => {
        this.products = data;
        console.log(this.products);
      })
      
  }
  ngOnInit(): void {
  }
  delete(id) {
    this.productsService.delete(id).subscribe((data) => {
      Swal.fire('Producto Eliminado', '','success');
    }, (error) => {
      console.log(error);
      Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
    });
  }
  add() {
    this.router.navigate(["/product-form"]);
  }
}
