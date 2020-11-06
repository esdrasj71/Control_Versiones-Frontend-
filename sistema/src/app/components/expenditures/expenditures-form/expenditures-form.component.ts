import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, } from '@angular/forms';
import { Expenditures } from '../interfaces/expenditures';
import { BillType } from '../../bill-type/interfaces/bill-type';
import { Expenses } from '../../expenses/interfaces/expenses';
import { Costs } from '../../costs/interfaces/costs';
import { Bank } from '../../bank/interfaces/bank';
import { Providers } from '../../providers/interfaces/providers';
import { ExpendituresService } from '../servicios/expenditures.service';
import { BillTypeService } from '../../bill-type/servicios/bill-type.service';
import { ExpensesService } from '../../expenses/servicios/expenses.service';
import { CostsService } from '../../costs/servicios/costs.service';
import { BankService } from '../../bank/servicios/bank.service';
import { ProvidersService } from '../../providers/servicios/providers.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-expenditures-form',
  templateUrl: './expenditures-form.component.html',
  styleUrls: ['./expenditures-form.component.css']
})
export class ExpendituresFormComponent implements OnInit {
  //Expenditures
  expenditures: Expenditures = {
    Date: null,
    Amount: null,
    Bill_Type_Id: null,
    No_Bill: null,
    Cheque: null,
    No_Cheque: null,
    Expenses_Id: null,
    Cost_Id: null,
    Bank_Id: null,
    Providers_Id: null
  };
  API_ENDPOINT = 'http://localhost:3000/';
  //Bill Type
  billtype: BillType[];
  bt: any[];
  //Expenses
  expenses: Expenses[];
  ex: any[];
  //Costs
  costs: Costs[];
  cs: any[];
  //Banks
  banks: Bank[];
  bk: any[];
  //Providers
  providers: Providers[];
  pr: any[];
  //Ng Select
  selectedBillTypeId: number;
  selectedExpensesId: number;
  selectedCostsId: number;
  selectedBanksId: number;
  selectedProvidersId: number;
  //Update
  id: any;
  editing: boolean = false;
  expendituresarr: Expenditures[];
  constructor(
    private fb: FormBuilder,
    private expendituresService: ExpendituresService,
    private billtypeService: BillTypeService,
    private expensesService: ExpensesService,
    private costsService: CostsService,
    private banksService: BankService,
    private providersService: ProvidersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
  ) {
    //Update
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
      console.log(this.expenditures);
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'expenditures', { headers }).subscribe(
        (data: Expenditures[]) => {
          this.expendituresarr = data;
          this.expenditures = this.expendituresarr.find((m) => {
            return m.Expenditures_Id == this.id;
          });
          //Ng Select
          this.selectedBillTypeId = this.expenditures.Bill_Type_Id;
          this.selectedExpensesId = this.expenditures.Expenses_Id;
          this.selectedCostsId = this.expenditures.Cost_Id;
          this.selectedBanksId = this.expenditures.Bank_Id;
          this.selectedProvidersId = this.expenditures.Providers_Id;
        },
        (error) => {
          console.log(error);
          Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
        }
      );
    } else {
      this.editing = false;
    }
    //List Foreign Keys
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });
    httpClient.get(this.API_ENDPOINT + 'billtype', { headers }).subscribe((data: BillType[]) => {
      this.billtype = data;
    });
    httpClient
      .get(this.API_ENDPOINT + 'expenses', { headers })
      .subscribe((data: Expenses[]) => {
        this.expenses = data;
      });
    httpClient
      .get(this.API_ENDPOINT + 'costs', { headers })
      .subscribe((data: Costs[]) => {
        this.costs = data;
      });
    httpClient
      .get(this.API_ENDPOINT + 'bank', { headers })
      .subscribe((data: Bank[]) => {
        this.banks = data;
      });
    httpClient
      .get(this.API_ENDPOINT + 'providers', { headers })
      .subscribe((data: Providers[]) => {
        this.providers = data;
      });
  }
  ngOnInit(): void {
  }
  saveExpenditures() {
    if (this.editing) {
      console.log(this.expenditures);
      //Ng Select
      this.expenditures.Bill_Type_Id = this.selectedBillTypeId;
      this.expenditures.Expenses_Id = this.selectedExpensesId;
      this.expenditures.Cost_Id = this.selectedCostsId;
      this.expenditures.Bank_Id = this.selectedBanksId;
      this.expenditures.Providers_Id = this.selectedProvidersId;
      this.expendituresService.put(this.expenditures).subscribe(
        (data) => {
          Swal.fire('Egreso Actualizado', '','success');
          location.reload();
          //window.location.reload();
          console.log(data);
          console.log(this.expenditures);
          this.router.navigate(['/expenditures-home']);
        },
        (error) => {
          console.log(error);
          Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
        }
      );
    } else {
      //Ng Select
      this.expenditures.Bill_Type_Id = this.selectedBillTypeId;
      this.expenditures.Expenses_Id = this.selectedExpensesId;
      this.expenditures.Cost_Id = this.selectedCostsId;
      this.expenditures.Bank_Id = this.selectedBanksId;
      this.expenditures.Providers_Id = this.selectedProvidersId;
      this.expendituresService.save(this.expenditures).subscribe(
        (data) => {
        Swal.fire('Egreso Guardado', '','success');
        this.router.navigate(['/expenditures-home']);
        console.log(data);
        },
        (error) => {
          console.log(error);
          Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''});
        }
      );
    }
  }
  //Serach Terms
  searchBillType(filter: string, billtype) {
    filter = filter.toLocaleLowerCase();
    return billtype.Name.toLocaleLowerCase().indexOf(filter) > -1;
  }
  searchExpenses(filter: string, expenses) {
    filter = filter.toLocaleLowerCase();
    return expenses.Name.toLocaleLowerCase().indexOf(filter) > -1;
  }
  searchCosts(filter: string, costs) {
    filter = filter.toLocaleLowerCase();
    return costs.Name.toLocaleLowerCase().indexOf(filter) > -1;
  }
  searchBanks(filter: string, banks) {
    filter = filter.toLocaleLowerCase();
    return banks.Bank_Name.toLocaleLowerCase().indexOf(filter) > -1;
  }
  searchProviders(filter: string, providers) {
    filter = filter.toLocaleLowerCase();
    return providers.Fiscal_Name.toLocaleLowerCase().indexOf(filter) > -1;
  }
  //Formularios Emergentes
  //Bank
  findbank(id) {
    this.selectedBanksId = id;
    this.banksService.findbank(id).subscribe((data: Bank[]) => {
      this.bk = data;//json
      return this.bk = Array.of(this.bk);
    });
  }
  //BillType
  findbilltype(id) {
    this.selectedBillTypeId = id;
    this.billtypeService.findbilltype(id).subscribe((data: BillType[]) => {
      this.bt = data;//json
      return this.bt = Array.of(this.bt);
    });
  }
  //Costs
  findcost(id) {
    this.selectedCostsId = id;
    this.costsService.findcost(id).subscribe((data: Costs[]) => {
      this.cs = data;//json
      return this.cs = Array.of(this.cs);
    });
  }
  //Expenses
  findexpenses(id) {
    this.selectedExpensesId = id;
    this.expensesService.findexpenses(id).subscribe((data: Expenses[]) => {
      this.ex = data;//json
      return this.ex = Array.of(this.ex);
    });
  }
  //Providers
  findproviders(id) {
    this.selectedProvidersId = id;
    this.providersService.findproviders(id).subscribe((data: Providers[]) => {
      this.pr = data;//json
      return this.pr = Array.of(this.pr);
    });
  }
}
