import { Component, OnInit } from '@angular/core';
import {IncomesService} from '../servicios/incomes.service';
import {HttpClient} from '@angular/common/http';
import {Incomes} from '../interfaces/income';


@Component({
  selector: 'app-incomes-form',
  templateUrl: './incomes-form.component.html',
  styleUrls: ['./incomes-form.component.css']
})
export class IncomesFormComponent implements OnInit {
  incomes: Incomes[];
  meses: String[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  tabla: any[] = [];
  temp: any = [];
  total_suc1 = 0;
  total_suc2 = 0;
  total_suc3 = 0;
  total_total = 0;
  constructor(private incomesSevice:IncomesService) { }

  ngOnInit(): void {
    this.incomesSevice.getIncomes().subscribe((data: Incomes[]) => {
      console.log(data);
      this.temp = data[12];
      //return this.incomes = data;
      this.temp.forEach((e)=>{
        let temp1 = {};
        
        temp1["mes"] = this.meses[e.mes-1];
        temp1["total_mes"] = e.total_mes;
        temp1["total_aux1"] = 0;
        temp1["total_aux2"] = 0;
        temp1["total_sumado"] = e.total_mes;
        this.tabla.push(temp1);
        this.total_suc1 += parseFloat(temp1["total_mes"]);
        this.total_suc2 += parseFloat(temp1["total_aux1"]);
        this.total_suc3 += parseFloat(temp1["total_aux2"]);
        this.total_total += parseFloat(temp1["total_sumado"]); 
      })
      console.log(this.tabla);
    });

    
  }
  onModificarCantidad(value: string, mes: string, datos: any){
    console.log(value);
    console.log(mes);
    console.log(datos);
    this.tabla.forEach((e)=>{
      if(e.mes == mes){
        if(datos == 1){
          this.total_suc1 -= parseFloat(e.total_mes);
          e.total_mes = value;
          this.total_suc1 +=  parseFloat(e.total_mes);
        }else if(datos == 2){
          this.total_suc2 -= parseFloat(e.total_aux1);
          e.total_aux1 = value;
          this.total_suc2 += parseFloat(e.total_aux1);
        }else if(datos == 3){
          this.total_suc3 -= parseFloat(e.total_aux2);
          e.total_aux2 = value;
          this.total_suc3 +=  parseFloat(e.total_aux2);
        }
      e.total_sumado = parseFloat( e.total_mes) + parseFloat( e.total_aux1) + parseFloat(e.total_aux2);   
      }
    })
    this.total_total = this.total_suc1 + this.total_suc2 + this.total_suc3;
  }

}
