import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import {Balance} from '../interfaces/balance';
import {BalancesService} from '../servicios/balances.service';

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
      alert("Ocurrio un error");
    })
  }
}
