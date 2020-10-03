import { Component, OnInit } from '@angular/core';
import {Brands } from '../interfaces/brand';
import {BrandsService} from '../servicios/brands.service'
@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css']
})
export class BrandFormComponent implements OnInit {
  brand: Brands ={
    Name: null,
  }
  constructor(private brandService: BrandsService) {

   } 

  ngOnInit(): void {
  }
  savebrand(){
    console.log(this.brand);
    this.brandService.save(this.brand).subscribe((data)=>{
      alert('Marca guardada');
      console.log(data)
    },(error)=>{
      console.log(error);
      alert('Ocurrio un error');
    })
  }

}
