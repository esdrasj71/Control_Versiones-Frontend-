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
  constructor(private brandsService: BrandsService, private httpClient: HttpClient) {
   
    this.brandsService.getBrand()
    .subscribe((data: Brands[]) =>{
      this.brands = data;
      console.log(this.brands);
    })
   }

searchTerm4 = '';

  ngOnInit(): void {
  }
    delete(id) {
      this.brandsService.delete(id).subscribe(
        (data) => {
          alert('Marca Eliminado');
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } 

}
