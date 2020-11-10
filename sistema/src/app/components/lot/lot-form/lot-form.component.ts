import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LotService } from '../servicios/lot.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lot } from '../interfaces/lot';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../product/interfaces/product';
import { Router } from '@angular/router';
import { Inventory } from '../../inventory/interfaces/inventory';
import { InventoryService } from '../../inventory/servicios/inventory.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lot-form',
  templateUrl: './lot-form.component.html',
  styleUrls: ['./lot-form.component.css']
})
export class LotFormComponent implements OnInit {
  @Output() Lot_Id = new EventEmitter<number>();
  lot: Lot = {
    Lot_Id: null,
    Due_Date: null,
    Product_Id: null,
  };
  inventory: Inventory = {
    Stock: 0,
    Unit_Price: 0,
    Lot_Id: null,
    Statuss: false,
  };
  API_ENDPOINT = 'http://localhost:3000/';
  //Update
  id: any;
  editing: boolean = false;
  selectedDueDate: Date;
  postarr: Lot[];
  products: Products[];
  selectedProductId: number;

  constructor(private invetoryService: InventoryService, private lotService: LotService, private activatedRoute: ActivatedRoute, private router: Router, private httpClient: HttpClient) {
    this.id = this.activatedRoute.snapshot.params['id'];
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accesstoken': localStorage.getItem('token') });

    if (this.id) {
      this.editing = true;
      this.httpClient.get(this.API_ENDPOINT + 'lot', { headers }).subscribe((data: Lot[]) => {
        this.postarr = data;
        console.log(this.postarr);
        this.lot = this.postarr.find((m) => { return m.Lot_Id == this.id });
        this.selectedProductId = this.lot.Product_Id;
        this.selectedDueDate = this.lot.Due_Date;
        console.log(this.selectedProductId);
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }

    httpClient.get(this.API_ENDPOINT + 'product', { headers })
      .subscribe((data: Products[]) => {
        this.products = data;
        console.log(this.products);
      })
  }
  ngOnInit() {
  }
  savePost() {
    if (this.editing) {
      this.lot.Product_Id = this.selectedProductId;
      this.lot.Due_Date = this.selectedDueDate;
      this.lotService.put(this.lot).subscribe((data) => { //El unico cambioes el put
        Swal.fire('Lote Actualizado', '', 'success');
        console.log(data)
      }, (error) => {
        console.log(error);
        Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' });
      });
    }
    else {
      if (this.selectedProductId == null || this.lot.Due_Date == null) {
        Swal.fire({ icon: 'warning', title: 'Aviso!', text: 'Debe llenar todos los campos' });
      }
      else {
        this.lot.Product_Id = this.selectedProductId;
        this.lot.Due_Date = this.selectedDueDate;
        console.log(this.lot);
        this.lotService.save(this.lot).subscribe((data) => {
          Swal.fire('Lote Guardado', '', 'success');
          //this.router.navigate(["/lot-home"]);
          this.Lot_Id.emit(data['id']);
          this.inventory.Lot_Id = data['id'];
          this.inventory.Statuss = false;
          console.log(this.inventory);
          this.invetoryService.save(this.inventory).subscribe((date) => {
            Swal.fire('Inventario Guardado', '', 'success');
            console.log(date)
          });

        }, (error) => {
          console.log(error);
          Swal.fire({ icon: 'error', title: 'Ocurrio un error', text: '' });
        });
      }
    }
  }
  searchProduct(filter: string, product) {
    filter = filter.toLocaleLowerCase();
    return (product.Complete.toLocaleLowerCase().indexOf(filter) > -1);
  }
}
