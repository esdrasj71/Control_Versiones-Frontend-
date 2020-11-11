import { Component, OnInit } from '@angular/core';
import {SeriesService} from '../servicios/series.service';
import {Series} from '../interfaces/serie';
import { Router } from '@angular/router';
@Component({
  selector: 'app-series-form',
  templateUrl: './series-form.component.html',
  styleUrls: ['./series-form.component.css']
})
export class SeriesFormComponent implements OnInit {

  serie: any = [];
  series: Series = {
      Nombre: null,
      Cantidad_inicial: null,
      Cantidad_limite: null,
  }
  constructor(private seriesService: SeriesService, private router: Router) {
    this.seriesService.getSeries().subscribe((data)=>{
      this.serie = data;
      console.log(this.serie)
    })
   }
  
  ngOnInit(): void {
  
 

  }
  seleccion(id, nombre, cantidad){
    localStorage.setItem('serie', JSON.stringify({serieId: id, Nombre: nombre, Cantidad:cantidad}));
    this.router.navigate(['/home']);
  }
  guardarserie(){
    this.series.Cantidad_inicial = 1;
    this.seriesService.saveSeries(this.series).subscribe((data)=>{
      alert("Serie guardada");

    },(error)=>{
      console.log(error);
      alert("Ocurrio un error al insertar la serie")
    })
    //console.log(this.series);
  }
}
