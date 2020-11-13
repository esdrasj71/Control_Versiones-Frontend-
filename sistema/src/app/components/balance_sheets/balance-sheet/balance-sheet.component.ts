import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import {Balance} from '../interfaces/balance';
import {BalancesService} from '../servicios/balances.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css']
})
export class BalanceSheetComponent implements OnInit {
  cuentas = [];
  nuenvas_cuentas = [];
  sum1 = 0;
  sum2 = 0;
  sum3 = 0;
  sum4 = 0;
  sum5 = 0;
  sum6 = 0;
  sum7 = 0;
  bandera = 0;

  balance: Balance ={
    fechafin: null,
  }
  constructor(private balanceService: BalancesService) {
    
  }

  ngOnInit(): void {
  }
  //enterrr.value, detalle.Balance_Id, detalle.Name, detalle.Type
//value,id, nombre, tipo
  registrar(value,id, Nombre, tipo){
   
   //console.log(this.cuentas)
    if(tipo == 1){
      this.sum1 = 0;
      this.cuentas.forEach(a =>{
        a[1].forEach(b =>{
          if(b["Name"] == Nombre){
            b["Monto"] = parseFloat( b["Valor_Base"]) + parseFloat(value);
          }
          this.sum1 += (typeof(b["Monto"]) == "undefined")? 0 :  b["Monto"]
        })
        
      })
    }else if(tipo == 2){
      this.sum2 = 0;
      this.cuentas.forEach(a =>{
        a[2].forEach(b =>{
          if(b["Name"] == Nombre){
            b["Monto"]  = b["Valor_Base"] +  parseFloat(value);
          }
          this.sum2 += (typeof(b["Monto"]) == "undefined")? 0 :  b["Monto"]
        })
      })
    }else if(tipo == 3){
      this.sum3 = 0;
      this.cuentas.forEach(a =>{
        a[4].forEach(b =>{
          if(b["Name"] == Nombre){
            b["Monto"]  = b["Valor_Base"] +  parseFloat(value);
          }
          this.sum3 += (typeof(b["Monto"]) == "undefined")? 0 :  b["Monto"]
        })
      })
    }else if(tipo == 4){

      this.sum4 = 0;
      this.cuentas.forEach(a =>{
        a[5].forEach(b =>{
          if(b["Name"] == Nombre){
            b["Monto"]  = b["Valor_Base"] +  parseFloat(value);
          }
          this.sum4 += (typeof(b["Monto"]) == "undefined")? 0 :  b["Monto"]
        })
      })
    }else if(tipo == 5){
      this.sum5 = 0;
      this.cuentas.forEach(a =>{
        a[6].forEach(b =>{
          if(b["Name"] == Nombre){
            b["Monto"]  = b["Valor_Base"] +  parseFloat(value);
          }
          this.sum5 += (typeof(b["Monto"]) == "undefined")? 0 :  b["Monto"]
        })
      })
    }else if(tipo == 6){
      this.sum6 = 0;
      this.cuentas.forEach(a =>{
        a[7].forEach(b =>{
          if(b["Name"] == Nombre){
            b["Monto"]  = b["Valor_Base"] +  parseFloat(value);
          }
          this.sum6 += (typeof(b["Monto"]) == "undefined")? 0 :  b["Monto"]
        })
      })
    }

   //aqui se va a mandar a insertar UwU TwT T_T
   let bandera: boolean =  false
    if(this.nuenvas_cuentas.length > 0 ){
      this.nuenvas_cuentas.forEach(a=>{
        if(a["Balance_Id"]== id){
          bandera = true;
          a["Monto"] = parseFloat(value);
        }
      })
      if(!bandera){
        this.nuenvas_cuentas.push({"Balance_Id": id, "Monto": parseFloat(value)})  
      }
    }else{
      this.nuenvas_cuentas.push({"Balance_Id": id, "Monto": parseFloat(value)})
    }
  }
  comprobar(bandera){
    if(bandera == this.nuenvas_cuentas.length){
      Swal.fire('EL BALANCE GENERAL ES EXACTO', '','success');
    }else if(bandera < 0){
      Swal.fire({icon: 'error', title: 'BALANCE GENERAL NO CUADRA, ASÍ QUE NO PUEDE SER ACTUALIZADO'});
    }
  }
  almacenar(){
  
    if((this.sum1+this.sum2)==(this.sum3+this.sum4+this.sum5+this.sum6)){
     
      this.nuenvas_cuentas.forEach((a)=>{
        this.balanceService.guardarbalance(a).subscribe((data)=>{
         
        if( data["estado"]){
          this.bandera += 1;
        }else{
          this.bandera = -1000;
        }
        this.comprobar(this.bandera); 
        },(error)=>{
          console.log(error);
          alert("Ocurrio un error");
          
        })
        console.log(this.bandera);
      })
      //Swal.fire('EL BALANCE GENERAL ES EXACTO', '','success');
    }else{
      Swal.fire({icon: 'error', title: 'BALANCE GENERAL NO CUADRA, ASÍ QUE NO PUEDE SER ACTUALIZADO'});
      
    }
  }
  guardar(){
    if(this.balance.fechafin == null){
      Swal.fire({icon: 'warning', title: 'Aviso!', text: 'Debe llenar todos los campos'}); 
      return;
    }
    this.balanceService.consultar(this.balance).subscribe((data)=>{
      
      let control = 1;
      
      let aux = {};
      let temp = [];
      let temp2 = [];
      let temp3 = [];
      let temp4 = [];
      let temp5 = [];
      let temp6 = [];
      let arreglo = [];
    
      data[0].forEach(a =>{
        if(a["Type"] == 1){
          
          //activo corriente
          a["Monto"] = (a["Name"] == "CUENTAS POR COBRAR (Total CC)")? data[2][0]["Total_cuentascobrar"] : (a["Name"] == "MERCADERIAS (Inventario)")?data[3][0]["Total_inventario"] : 0
          a["Valor_Base"] = parseFloat( a["Monto"]);
          this.sum1 += parseFloat( a["Monto"]);
          temp.push(a);
        }else if(a["Type"] == 2){
          //activo no corriente
          a["Monto"] = 0;
          a["Valor_Base"] = a["Monto"];
          this.sum2 += a["Monto"];
          temp2.push(a);
        }else if(a["Type"] == 3){
          //Pasivo corriente
          a["Monto"] = (a["Name"] == "CUENTAS POR PAGAR (Total CP)")? data[4][0]["Total_cuentaspagar"] : 0
          a["Valor_Base"] = a["Monto"];
          this.sum3 += a["Monto"];
          temp3.push(a);
        }else if(a["Type"] == 4){
          //Pasivo a largo plazo
          a["Monto"] = 0;
          a["Valor_Base"] = a["Monto"];
          this.sum4 += a["Monto"];
          temp4.push(a);
        }else if(a["Type"] == 5){
          //capital
          a["Monto"] = 0;
          a["Valor_Base"] = a["Monto"];
          this.sum5 += a["Monto"];
          temp5.push(a);
        }else if(a["Type"] == 6){
          //utilidad operativa
          //a["Monto"] = 0;
          a["Monto"] = (a["Name"] == "UTILIDAD O PERDIDA DEL EJERCICIO")? data[8][0]["@utilidad_operativa"] : 0
          a["Valor_Base"] = a["Monto"];
          this.sum6 +=a ["Monto"];
          temp6.push(a);
        }
      })
      data[1].forEach(a=>{
        temp.forEach(b=>{
          if(a["Balance_Id"]==b["Balance_Id"]){
            b["Monto"] += a["Amount"];
            b["Valor_Base"] += a["Amount"];
            this.sum1 += a["Amount"];
          }
        })
        temp2.forEach(b=>{
          if(a["Balance_Id"]==b["Balance_Id"]){
            b["Monto"] += a["Amount"];
            b["Valor_Base"] += a["Amount"];
            this.sum2 += a["Amount"];
          }
        })
        temp3.forEach(b=>{
          if(a["Balance_Id"]==b["Balance_Id"]){
            b["Monto"] += a["Amount"];
            b["Valor_Base"] += a["Amount"];
            this.sum3 += a["Amount"];
          }
        })
        temp4.forEach(b=>{
          if(a["Balance_Id"]==b["Balance_Id"]){
            b["Monto"] += a["Amount"];
            b["Valor_Base"] += a["Amount"];
            this.sum4 += a["Amount"];
          }
        })
        temp5.forEach(b=>{
          if(a["Balance_Id"]==b["Balance_Id"]){
            b["Monto"] += a["Amount"];
            b["Valor_Base"] += a["Amount"];
            this.sum5 += a["Amount"];
          }
        })
        temp6.forEach(b=>{
          if(a["Balance_Id"]==b["Balance_Id"]){
            b["Monto"] += a["Amount"];
            b["Valor_Base"] += a["Amount"];
            this.sum6 += a["Amount"];
          }
        })
      })
      arreglo.push([{"Nombre":"Activo"}])
      temp.push([{"Nombre":"Activo Corriente", "Total": this.sum1}])
      arreglo.push(temp)
      temp2.push([{"Nombre":"Activo No corriente", "Total": this.sum2}])
      arreglo.push(temp2)
      arreglo.push([{"Nombre":"Pasivo"}])
      temp3.push([{"Nombre":"Pasivo Corriente", "Total":this.sum3}])
      arreglo.push(temp3)
      temp4.push([{"Nombre":"Pasivo a Largo Plazo", "Total":this.sum4}])
      arreglo.push(temp4)
      arreglo.push(temp5)
      arreglo.push(temp6)
      this.cuentas.push(arreglo)
    
      //console.log(arreglo);
    },(error)=>{
      alert("Ocurrio un error");
    })
 
  }
}
