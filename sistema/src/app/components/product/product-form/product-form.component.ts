import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Brands } from '../../brand/interfaces/brand';
import { HttpClient } from '@angular/common/http';
import { Product_Category } from '../../product_category/interfaces/product-category';
import { Products } from '../interfaces/product';
import { Lot } from '../../lot/interfaces/lot';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../servicios/products.service';
import { LotService } from '../../lot/servicios/lot.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  //Product
  product: Products = {
    Name: null,
    Perishable: false,
    Correlative_Product: null,
    Brand_Id: null,
    Product_Category_Id: null,
  }
  //Lot
  lot: Lot = {
    Due_Date: null,
    Product_Id: null,
  }
  API_ENDPOINT = 'http://localhost:3000/';
  brands: Brands[];
  product_category: Product_Category[];
  selectedBrandId: number;
  selectedCategoryId: number;
  selectedDueDate: Date = this.lot.Due_Date;
  //Update
  id: any;
  id2: any;
  lastidproduct: number;
  editing: boolean = false;
  productarr: Products[];
  lotarr: Lot[];
  
  constructor(private fb: FormBuilder, private httpClient: HttpClient, private productService: ProductsService, private router: Router, private lotService: LotService, private activatedRoute: ActivatedRoute) {
    //Update
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'product').subscribe((data: Products[]) => {
        this.productarr = data;
        this.product = this.productarr.find((m) => { return m.Product_Id == this.id });
        this.selectedCategoryId = this.product.Product_Category_Id;
        this.selectedBrandId = this.product.Brand_Id;
        this.lot.Product_Id = this.product.Product_Id;
        this.lot.Due_Date = this.selectedDueDate;
        console.log(this.product);
        console.log(this.lot);
      },
        (error) => {
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
        this.product_category = data;
      });
  }
  ngOnInit(): void {

  }
  saveProduct() {
    if (this.editing) {
      this.product.Product_Category_Id = this.selectedCategoryId;
      this.product.Brand_Id = this.selectedBrandId;
      this.productService.put(this.product).subscribe((data) => {
        this.lastidproduct = data['id'];
        //this.lot.Product_Id = this.lastidproduct;
        alert('Producto actualizado');
        console.log(this.product);
        console.log(this.lot);
        console.log(data);
        //
        if (this.product.Perishable == true) {
          console.log("Entro perro")
          //this.selectedDueDate = this.lot.Due_Date;
          this.lotService.put(this.lot).subscribe((data) => {
            alert('Lot Actualizado');
            console.log(data);
          }, (error) => {
            console.log(error);
            alert('Ocurrio un error');
          })
        }
        //
        this.router.navigate(["/product-home"]);
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      })
    }
    else {
      this.product.Product_Category_Id = this.selectedCategoryId;
      this.product.Brand_Id = this.selectedBrandId;
      this.productService.saveproduct(this.product).subscribe((data) => {
        this.lastidproduct = data['id'];
        this.lot.Product_Id = this.lastidproduct;
        alert('Producto guardado');
        this.router.navigate(["/product-home"]);
        console.log(data);
        if (this.product.Perishable == true) {
          this.lotService.save(this.lot).subscribe((data) => {
            alert('Lot Guardado');
            console.log(data);
          }, (error) => {
            console.log(error);
            alert('Ocurrio un error');
          })
        }
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
