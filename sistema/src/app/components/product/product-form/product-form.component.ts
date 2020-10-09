import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Brands } from '../../brand/interfaces/brand';
import { HttpClient } from '@angular/common/http';
import { Product_Category } from '../../product_category/interfaces/product-category';
import { Products } from '../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../servicios/products.service';
import { BrandsService } from '../../brand/servicios/brands.service';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Output() Product_Id = new EventEmitter<number>();
  product: Products = {
    Name: null,
    Perishable: null,
    Correlative_Product: null,
    Brand_Id: null,
    Product_Category_Id: null,
  }
  API_ENDPOINT = 'http://localhost:3000/';
  brands: Brands[];
  product_category: Product_Category[];
  selectedBrandId: number;
  selectedCategoryId: number;
  //Update
  id: any;
  editing: boolean = false;
  productarr: Products[];
  constructor(private fb: FormBuilder, private httpClient: HttpClient, private productService: ProductsService, private activatedRoute: ActivatedRoute) {
    //Update
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      console.log(this.product);
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'product').subscribe((data: Products[]) => {
        this.productarr = data;
        //console.log(this.productarr);
        this.product = this.productarr.find((m) => { return m.Product_Id == this.id });
        this.selectedCategoryId=this.product.Product_Category_Id;
        this.selectedBrandId=this.product.Brand_Id;
      }, (error) => {
        console.log(error);
      });
    }
    else {
      this.editing = false;
    }
    httpClient.get(this.API_ENDPOINT + 'brands')
      .subscribe((data: Brands[]) => {
        this.brands = data;
      })
    httpClient.get(this.API_ENDPOINT + 'product_category')
      .subscribe((data: Product_Category[]) => {
        this.product_category = data; //Se debe acceder al arreglo de este modo, oAngular lo reconocera como un objeto del tipo Post
      });
  }

  ngOnInit(): void {

  }

  saveProduct() {
    if (this.editing) {
      console.log(this.product);
      this.product.Product_Category_Id = this.selectedCategoryId ;
      this.product.Brand_Id = this.selectedBrandId;
      this.productService.put(this.product).subscribe((data) => {
        alert('Producto actualizado');
        console.log(this.product);
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      })
    }
    else {
      this.product.Product_Category_Id = this.selectedCategoryId;
      this.product.Brand_Id = this.selectedBrandId;
      console.log(this.product);
      this.product.Perishable = false;
      this.productService.saveproduct(this.product).subscribe((data) => {
        this.Product_Id.emit(data["id"]);
        alert('Producto guardado');
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      })
    }
  }

  searchCategory(filter: string, product_category) {
    filter = filter.toLocaleLowerCase();
    return (product_category.Name.toLocaleLowerCase().indexOf(filter) > -1);
  }

  searchBrand(filter: string, brands) {
    filter = filter.toLocaleLowerCase();
    return (brands.Name.toLocaleLowerCase().indexOf(filter) > -1);
  }
}
