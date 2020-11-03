import { Component, OnInit } from '@angular/core';
import { Brands } from '../interfaces/brand';
import { BrandsService } from '../servicios/brands.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css']
})
export class BrandFormComponent implements OnInit {
  brand: Brands = {
    Name: null,
  };
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false; 
  postarr: Brands[]; 
  constructor(private brandService: BrandsService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.id = this.activatedRoute.snapshot.params['id']; 
    if (this.id) {
      this.editing = true;
      this.brandService.getBrand().subscribe((data: Brands[]) => { 
        this.postarr = data;
        console.log(this.postarr);
        this.brand = this.postarr.find((m) => { return m.Brand_Id == this.id });
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }
  }

  ngOnInit(): void {
  }
  saveBrand() {
    if (this.editing) {
      this.brandService.put(this.brand).subscribe((data) => { //El unico cambioes el put
        Swal.fire('Marca Actualizado', '','success');
        console.log(data)
      }, (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
      });
    }
    else {
      console.log(this.brand);
      this.brandService.save(this.brand).subscribe((data) => {
        Swal.fire('Marca Guardada', '','success');
        console.log(data)
      }, (error) => {
        console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
      });
    }
  }
}
