import { Component, OnInit } from '@angular/core';
import {SeriesService} from '../servicios/series.service';
import {Series} from '../interfaces/serie';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
      //console.log(this.serie)
    })
   }
  
  ngOnInit(): void {
  
 

  }
  seleccion(id, nombre, cantidad){
    localStorage.setItem('serie', JSON.stringify({serieId: id, Nombre: nombre, Cantidad:cantidad}));
    this.router.navigate(['/home']);
  }
  guardarserie(){
      if(this.series.Nombre == null || this.series.Cantidad_limite == null || this.series.Cantidad_limite == 0 ){
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: 'Conflictos al insertar la serie'});
      }else{
        this.series.Cantidad_inicial = 1;
      this.seriesService.saveSeries(this.series).subscribe((data)=>{
        Swal.fire('Serie Guardada', '','success');
        window.setTimeout(function(){this.router.navigate(['/home']);
        this.router.navigate(['/bill-header-form']);
      },1200) 
      },(error)=>{
        //console.log(error);
        Swal.fire({icon: 'error', title: 'Ocurrio un error', text: 'Conflictos al insertar la serie'});
      })
      }
      
    
     
    
  
   
  }
}
