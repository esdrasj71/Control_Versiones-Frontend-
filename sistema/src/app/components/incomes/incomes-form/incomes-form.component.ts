import { Component, OnInit } from '@angular/core';
import { IncomesService } from '../servicios/incomes.service';
import { HttpClient } from '@angular/common/http';
import { Incomes } from '../interfaces/income';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-incomes-form',
  templateUrl: './incomes-form.component.html',
  styleUrls: ['./incomes-form.component.css']
})
export class IncomesFormComponent implements OnInit {
  ingresos: Incomes = {
    Branch_Office1: null,
    Branch_Office2: null,
    Branch_Office3: null,
    Income_Date: null,
    Total: null
  }
  incomes: Incomes[];
  meses: String[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  tabla: any[] = [];
  temp: any = [];
  total_suc1 = 0;
  total_suc2 = 0;
  total_suc3 = 0;
  total_total = 0;

  date = new Date();
  mes = this.date.getMonth() + 1
  //fecha = this.date.getDate() + "/" + this.mes.toString() + "/" + this.date.getFullYear();
  fecha = this.date.getFullYear() + "/" + this.mes.toString() + "/" + this.date.getDate();
  bandera: number = 0;
  bandera1: number = 0;
  ban: boolean = false;

  //empresa
  empresa: any = [];
  constructor(private incomesSevice: IncomesService) { }

  ngOnInit(): void {
    this.incomesSevice.getIncomes().subscribe((data: Incomes[]) => {
      this.temp = data[12];
      //return this.incomes = data;
      this.temp.forEach((e) => {
        let temp1 = {};

        temp1["mes"] = e.mes;
        temp1["mes_letras"] = this.meses[e.mes - 1];
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
    });

    this.incomesSevice.getIncomesNuevo().subscribe((data: Incomes[]) => {
      this.incomes = data;
      if (this.incomes.length > 0) {
        this.total_suc1 = 0;
        this.total_suc2 = 0;
        this.total_suc3 = 0;
        this.total_total = 0;
        this.tabla.forEach((e) => {
          this.incomes.forEach((b) => {
            if (e.mes == b.Income_Date) {
              e.mes = this.meses[e.mes - 1];;
              e.total_mes = b.Branch_Office1;
              e.total_aux1 = b.Branch_Office2;
              e.total_aux2 = b.Branch_Office3;
              e.total_sumado = b.Total;
            }
          })
          this.total_suc1 += parseFloat(e.total_mes);
          this.total_suc2 += parseFloat(e["total_aux1"]);
          this.total_suc3 += parseFloat(e["total_aux2"]);
          this.total_total += parseFloat(e["total_sumado"]);
        })
      }
    })

    this.incomesSevice.getempresa().subscribe((data) => {
      this.empresa = data[0];
      return this.empresa;
    })

  }
  onModificarCantidad(value: string, mes: string, datos: any) {
    this.tabla.forEach((e) => {
      if (e.mes == mes) {
        if (datos == 1) {
          this.total_suc1 -= parseFloat(e.total_mes);
          e.total_mes = value;
          this.total_suc1 += parseFloat(e.total_mes);
        } else if (datos == 2) {
          this.total_suc2 -= parseFloat(e.total_aux1);
          e.total_aux1 = value;
          this.total_suc2 += parseFloat(e.total_aux1);
        } else if (datos == 3) {
          this.total_suc3 -= parseFloat(e.total_aux2);
          e.total_aux2 = value;
          this.total_suc3 += parseFloat(e.total_aux2);
        }
        e.total_sumado = parseFloat(e.total_mes) + parseFloat(e.total_aux1) + parseFloat(e.total_aux2);
      }
    })
    this.total_total = this.total_suc1 + this.total_suc2 + this.total_suc3;
  }
  estado(numero: number, cadena: string, estado: boolean) {
    if (estado) {
      if (numero == 12) {
        this.ban = true;
      }
      if (this.ban) {
        alert("Punto de venta " + cadena);
        //Swal.fire({icon: 'error', title: 'Ocurrio un error', text: cadena});
      }
    } else {
      alert("Ocurrio un error " + cadena);
      //Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
    }
  }
  saveincomes() {
    this.tabla.forEach((e) => {
      let numero_mes = 0;
      this.meses.forEach((a) => {
        if (e.mes == a) {
          e.mes = numero_mes + 1;
        }
        numero_mes++;
      })

    })
    // fecha = this.date.getFullYear()  + "/" + this.mes.toString() + "/" + this.date.getDate();
    if (this.incomes.length == 0) {
      this.tabla.forEach((b) => {
        this.ingresos.Branch_Office1 = b.total_mes;
        this.ingresos.Branch_Office2 = b.total_aux1;
        this.ingresos.Branch_Office3 = b.total_aux2;
        this.ingresos.Income_Date = this.date.getFullYear() + "/" + b.mes + "/" + "01";
        this.ingresos.Total = b.total_sumado;
        this.incomesSevice.saveingresos(this.ingresos).subscribe((data) => {
          this.bandera += 1;
          this.estado(this.bandera, "insertado", true)
        }, (error) => {
          console.log(error);
          this.bandera = -1;
          this.estado(this.bandera, "insertado", false)
        })
      })

    } else {

      this.tabla.forEach((b) => {
        this.ingresos.Branch_Office1 = b.total_mes;
        this.ingresos.Branch_Office2 = b.total_aux1;
        this.ingresos.Branch_Office3 = b.total_aux2;
        this.ingresos.Income_Date = b.mes;
        this.ingresos.Total = b.total_sumado;
        this.incomesSevice.put(this.ingresos).subscribe((data) => {
          this.bandera1 += 1;
          //this.estado(this.bandera1, "actualizado", true)
          Swal.fire('Ingreso Actualizado', '','success');
        }, (error) => {
          console.log(error);
          this.bandera1 = -1;
          //this.estado(this.bandera1, "actualizado", false)
          //Swal.fire('Ingreso Actualizado', '','success');
        })
      })

    }
  }

}
