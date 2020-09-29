import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import {Brands } from '../../brand/interfaces/brand';
import { HttpClient } from '@angular/common/http';
import { Product_Category } from '../../product_category/interfaces/product-category';
import {Products} from '../interfaces/product';
import { ProductsService } from '../servicios/products.service';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
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
  @Input() name: string;
  form: FormGroup;
  estado_fecha: boolean = false;
  constructor(private fb: FormBuilder, private httpClient: HttpClient, private productService: ProductsService ) {
    httpClient.get(this.API_ENDPOINT + 'brands')
    .subscribe((data: Brands[]) =>{
      this.brands = data;
      console.log(this.brands);
    })
    httpClient.get(this.API_ENDPOINT + 'product_category')
    .subscribe((data: Product_Category[]) => {
      this.product_category = data; //Se debe acceder al arreglo de este modo, oAngular lo reconocera como un objeto del tipo Post
      console.log(this.product_category);
    });
    this.form = this.fb.group({
      estado_fecha: this.fb.array([], [Validators.required])
    })

   }

  ngOnInit(): void {
  }

  showform = function () {
      this.estado_fecha =true;
      console.log(this.estado_fecha)
    }
    onCheckboxChange(e) {
      const estado_fecha: FormArray = this.form.get('estado_fecha') as FormArray;
  
      if (e.target.checked) {
        const index = estado_fecha.controls.findIndex(x=>x.value === e.target.value);
        estado_fecha.removeAt(index)
        console.log(index)
      } else {
        estado_fecha.push(new FormControl(e.target.value));
      }
    }
    saveProduct(){
      this.productService.saveproduct(this.product).subscribe((data)=>{
        alert('Producto guardado');
        console.log(data)
      }, (error)=>{
        console.log(error);
        alert('Ocurrio un error');
      })
    }

 
}
