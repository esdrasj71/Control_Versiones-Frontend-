import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../servicios/products.service';
import { HttpClient } from '@angular/common/http';
import { Products } from '../interfaces/product';
import { Router} from '@angular/router';
@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  products: Products[]
  filtrado_product = '';
  constructor(private productsService: ProductsService, private router: Router ,private httpClient: HttpClient) {
    httpClient.get(this.API_ENDPOINT + 'product')
      .subscribe((data: Products[]) => {
        this.products = data;
      })
  }
  ngOnInit(): void {
  }
  delete(id) {
    this.productsService.delete(id).subscribe((data) => {
      alert('Producto eliminado'); 
      window.location.reload();
    }, (error) => {
      console.log(error);
    });
  }
  add(){
    this.router.navigate(["/product-form"]);
  }
}
