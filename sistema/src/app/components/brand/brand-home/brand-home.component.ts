import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../servicios/brands.service';
import { HttpClient } from '@angular/common/http';
import { Brands } from '../interfaces/brand';

@Component({
  selector: 'app-brand-home',
  templateUrl: './brand-home.component.html',
  styleUrls: ['./brand-home.component.css']
})
export class BrandHomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  brands: Brands[];
  rootBrand = ''; 
  constructor(private brandsService: BrandsService, private httpClient: HttpClient) {
   
    httpClient.get(this.API_ENDPOINT + 'brands')
    .subscribe((data: Brands[]) =>{
      this.brands = data;
      console.log(this.brands);
    })
   }

   delete(id) {
    this.brandsService.delete(id).subscribe(
      (data) => {
        alert('Marca Eliminado');
      },
      (error) => {
        console.log(error);
      }
    );
  } 

  ngOnInit(): void {
  }
  findbrand(brandOne){
    //this.httpClient.get(this.API_ENDPOINT + 'brands/:brandId')
    //.subscribe((data: Brands[] )=>{
      //this.brands = data;
    this.rootBrand = brandOne;
    console.log(this.rootBrand);
    }

}
