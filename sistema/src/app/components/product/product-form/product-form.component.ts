import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { Brands } from '../../brand/interfaces/brand';
import { BrandsService } from '../../brand/servicios/brands.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product_Category } from '../../product_category/interfaces/product-category';
import { Products } from '../interfaces/product';
import { Lot } from '../../lot/interfaces/lot';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../servicios/products.service';
import { LotService } from '../../lot/servicios/lot.service';
import { Procedure_SaveProduct } from '../interfaces/procedure_saveproduct';
import { Router } from '@angular/router';
import { ProductCategoryService } from '../../product_category/servicios/product-category.service';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  @Output() Product_Id = new EventEmitter<number>();
  //Product
  product: Products = {
    Name: null,
    Perishable: false,
    Correlative_Product: null,
    Brand_Id: null,
    Product_Category_Id: null,
  };
  //Lot
  lot: Lot = {
    Due_Date: null,
    Product_Id: null,
  };
  //Procedure SaveProduct
  procedure_saveproduct: Procedure_SaveProduct = {
    Name: null,
    Correlative_Product: null,
    Perishable: false,
    Brand_Id: null,
    Product_Category_Id: null,
    Statuss: null,
    Due_Date: null,
  };
  API_ENDPOINT = 'http://localhost:3000/';
  brands: Brands[];
  brand: any[];
  product_category: Product_Category[];
  productcategory: any[];
  selectedBrandId: number;
  selectedCategoryId: number;
  selectedDueDate: Date = this.lot.Due_Date;
  //Update
  id: any;
  lastidproduct: number;
  editing: boolean = false;
  productarr: Products[];

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private productService: ProductsService,
    private router: Router,
    private lotService: LotService,
    private brandService: BrandsService,
    private productcategoryService: ProductCategoryService,
    private activatedRoute: ActivatedRoute
  ) {
    //Update
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      console.log(this.product);
      this.editing = true;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});

      this.httpClient.get(this.API_ENDPOINT + 'product',{headers}).subscribe(
        (data: Products[]) => {
          this.productarr = data;
          this.product = this.productarr.find((m) => {
            return m.Product_Id == this.id;
          });
          this.selectedCategoryId = this.product.Product_Category_Id;
          this.selectedBrandId = this.product.Brand_Id;
          this.lot.Product_Id = this.product.Product_Id;
          this.lot.Due_Date = this.selectedDueDate;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.editing = false;
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token')});
    httpClient.get(this.API_ENDPOINT + 'brands',{headers}).subscribe((data: Brands[]) => {
      this.brands = data;
    });
    httpClient
      .get(this.API_ENDPOINT + 'product_category',{headers})
      .subscribe((data: Product_Category[]) => {
        this.product_category = data;
      });
  }
  ngOnInit(): void {}
  saveProduct() {
    if (this.editing) {
      console.log(this.product);
      this.product.Product_Category_Id = this.selectedCategoryId;
      this.product.Brand_Id = this.selectedBrandId;
      this.productService.put(this.product).subscribe(
        (data) => {
          this.lastidproduct = data['id'];
          //
          this.lot.Product_Id = this.lastidproduct;
          alert('Producto actualizado');
          location.reload();
          //window.location.reload();
          console.log(data);
          console.log(this.product);
          this.router.navigate(['/product-home']);
        },
        (error) => {
          console.log(error);
          alert('Ocurrio un error');
        }
      );
    } else {
      this.procedure_saveproduct.Product_Category_Id = this.selectedCategoryId;
      this.procedure_saveproduct.Brand_Id = this.selectedBrandId;
      this.productService.saveprocedure(this.procedure_saveproduct).subscribe(
        (data) => {
       
          //this.lastidproduct = data['id'];
          //
          //this.procedure_saveproduct.Product_Id = this.lastidproduct;
          //console.log(this.procedure_saveproduct.Product_Id);
          alert('Producto guardado con el procedimiento almacenado');
          this.Product_Id.emit(data['Correlative_Product']);
          //console.log(this.procedure_saveproduct);
          //this.router.navigate(['/product-home']);
          //console.log(data);
        },
        (error) => {
          console.log(error);
          alert('Ocurrio un error');
          console.log(this.procedure_saveproduct);
          console.log(this.product);
        }
      );
    }
  }
  searchCategory(filter: string, product_category) {
    filter = filter.toLocaleLowerCase();
    return product_category.Name.toLocaleLowerCase().indexOf(filter) > -1;
  }
  searchBrand(filter: string, brands) {
    filter = filter.toLocaleLowerCase();
    return brands.Name.toLocaleLowerCase().indexOf(filter) > -1;
  }
  getBrandId(id) {
    this.selectedBrandId = id;
    this.brandService.getBrandId(id).subscribe((data: Brands[]) => {
      this.brand = data;//json
      return this.brand = Array.of(this.brand);
    });
  }
  getCategoryId(id) {
    this.selectedCategoryId = id;
    this.productcategoryService.getCategoryId(id).subscribe((data: Product_Category[]) => {
      this.productcategory = data;//json
      return this.productcategory = Array.of(this.productcategory);
    });
  }
}
