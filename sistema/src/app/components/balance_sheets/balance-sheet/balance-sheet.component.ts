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
  balance: Balance ={
    fechafin: null,
  }
  constructor(private balanceService: BalancesService) {
    
  }

  ngOnInit(): void {
  }
  guardar(){
    this.balanceService.consultar(this.balance).subscribe((data)=>{
      console.log(data);
    },(error)=>{
      Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
    })
  }
}
