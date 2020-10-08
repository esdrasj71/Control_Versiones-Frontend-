import { Component, OnInit } from '@angular/core';
import {Brands } from '../interfaces/brand';
import {BrandsService} from '../servicios/brands.service';

@Component({
  selector: 'app-brand-post',
  templateUrl: './brand-post.component.html',
  styleUrls: ['./brand-post.component.css']
})
export class BrandPostComponent implements OnInit {

  brands: Brands ={
    Name: null,
  }
  API_ENDPOINT = 'http://localhost:3000/';
   
   ngOnInit(): void {
  }

  constructor(private brandService: BrandsService) {

  }

  saveBrand(){
    console.log(this.brands);
    this.brandService.save(this.brands).subscribe((data)=>{
      alert('Marca guardada');
      console.log(data)
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    })
  }
}
