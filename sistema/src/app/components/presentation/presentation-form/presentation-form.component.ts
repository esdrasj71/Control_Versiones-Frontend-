import { Component, OnInit } from '@angular/core';
import { PresentacionService } from '../servicios/presentacion.service';
import { HttpClient } from '@angular/common/http';
import { Presentation } from '../interfaces/presentation';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-presentation-form',
  templateUrl: './presentation-form.component.html',
  styleUrls: ['./presentation-form.component.css']
})
export class PresentationFormComponent implements OnInit {

  presentation: Presentation = {
    Presentation_Id:null,
    Name: null,
  }; //este arreglo define los campos que se van a ingresar en el formulario
  API_ENDPOINT = 'http://localhost:3000/';
  id: any;
  editing: boolean = false; //Este campo ayuda a saber cuando estamos editando y cuando estamos ingresando
  postarr: Presentation[]; //Este campo nos ayudara a traer los datos cuando queremos editar
  constructor(private presentationService: PresentacionService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.id = this.activatedRoute.snapshot.params['id']; //Este es el parametro que se definio en la ruta de app.module.ts
    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'presentation').subscribe((data: Presentation[]) => { //Aqui traemos el arreglo completo de datos
        this.postarr = data;
        console.log(this.postarr);
        this.presentation = this.postarr.find((m) => { return m.Presentation_Id == this.id }); //Aqui traemos solo el id que nos interesa
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
      this.presentationService.put(this.presentation).subscribe((data) => { //El unico cambioes el put
        alert('Presentacion actualizado');
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
    else {
      console.log(this.presentation);
      this.presentationService.save(this.presentation).subscribe((data) => {
        alert('Presentacion guardado');
        console.log(data)
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    }
  } 
}
