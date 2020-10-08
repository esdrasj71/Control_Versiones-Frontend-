import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { ProvidersService } from '../servicios/providers.service';
import { HttpClient } from '@angular/common/http';
import { Providers } from '../interfaces/providers';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-providers-form',
  templateUrl: './providers-form.component.html',
  styleUrls: ['./providers-form.component.css']
})
export class ProvidersFormComponent implements OnInit {
  @Output() Provider_Id = new EventEmitter<number>();
  providers: Providers = {
    Providers_Id:null,
    NIT: null,
    Fiscal_Name: null,
    Phone_Number1:null,
    Phone_Number2:null,
    Email:null,
    Address:null,
  }; //este arreglo define los campos que se van a ingresar en el formulario
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false; //Este campo ayuda a saber cuando estamos editando y cuando estamos ingresando
  postarr: Providers[]; //Este campo nos ayudara a traer los datos cuando queremos editar
  constructor(private providersService: ProvidersService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.id = this.activatedRoute.snapshot.params['id']; //Este es el parametro que se definio en la ruta de app.module.ts
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'providers').subscribe((data: Providers[]) => { //Aqui traemos el arreglo completo de datos
        this.postarr = data;
        console.log(this.postarr);
        this.providers = this.postarr.find((m) => { return m.Providers_Id == this.id }); //Aqui traemos solo el id que nos interesa
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }
  }
  ngOnInit() {
  }
  savePost() {
    if (this.editing) {
      this.providersService.put(this.providers).subscribe((data) => { //El unico cambioes el put
        alert('Proveedor actualizado');
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
    else {
      console.log(this.providers);
      this.providersService.save(this.providers).subscribe((data) => {
        this.Provider_Id.emit(data["id"]);
        alert('Proveedor guardado');
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
  }
}
