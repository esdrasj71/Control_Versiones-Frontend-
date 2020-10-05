import { Component, OnInit } from '@angular/core';
import { Brands } from '../interfaces/brand';
import { BrandsService } from '../servicios/brands.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  editing: boolean = false; //Este campo ayuda a saber cuando estamos editando y cuando estamos ingresando
  postarr: Brands[]; //Este campo nos ayudara a traer los datos cuando queremos editar
  constructor(private brandService: BrandsService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.id = this.activatedRoute.snapshot.params['id']; //Este es el parametro que se definio en la ruta de app.module.ts
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'brands').subscribe((data: Brands[]) => { //Aqui traemos el arreglo completo de datos
        this.postarr = data;
        console.log(this.postarr);
        this.brand = this.postarr.find((m) => { return m.Brand_Id == this.id }); //Aqui traemos solo el id que nos interesa
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }
<<<<<<< HEAD
  }

  ngOnInit(): void {
  }
  saveBrand() {
    if (this.editing) {
      this.brandService.put(this.brand).subscribe((data) => { //El unico cambioes el put
        alert('Marca actualizado');
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
    else {
      console.log(this.brand);
      this.brandService.save(this.brand).subscribe((data) => {
        alert('Marca guardado');
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
  }
=======
  constructor(private brandService: BrandsService) {

  }

  ngOnInit(): void {
  }
  savebrand() {
    console.log(this.brand);
    this.brandService.save(this.brand).subscribe((data) => {
      alert('Marca guardada');
      console.log(data)
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error');
    })
  }
>>>>>>> Ramajulio

}
