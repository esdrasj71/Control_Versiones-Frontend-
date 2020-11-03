import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { Brands } from '../interfaces/brand';
import { BrandsService } from '../servicios/brands.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient , HttpHeaders  } from '@angular/common/http';
@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css']
})
export class BrandFormComponent implements OnInit {
  @Output() Brand_Id = new EventEmitter<number>();
  brand: Brands = {
    Name: null,
  };
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false; 
  postarr: Brands[]; 
  constructor(private brandService: BrandsService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json', 'accesstoken': localStorage.getItem('token') });
    this.id = this.activatedRoute.snapshot.params['id']; 
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'brands', { headers }).subscribe((data: Brands[]) => {
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
        this.Brand_Id.emit(data['id']);
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
  }
}
