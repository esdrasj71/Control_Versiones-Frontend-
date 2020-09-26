import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../servicios/providers.service';
import { HttpClient } from '@angular/common/http';
import { Providers } from '../interfaces/providers';
@Component({
  selector: 'app-providers-home',
  templateUrl: './providers-home.component.html',
  styleUrls: ['./providers-home.component.css'],
})
export class ProvidersHomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  providers: Providers[];
  constructor(
    private providersService: ProvidersService,
    private httpClient: HttpClient
  ) {
    httpClient
      .get(this.API_ENDPOINT + 'providers')
      .subscribe((data: Providers[]) => {
        this.providers = data; //Se debe acceder al arreglo de este modo, oAngular lo reconocera como un objeto del tipo Post
        console.log(this.providers);
      });
  }
  ngOnInit() {}
  delete(id) {
    this.providersService.delete(id).subscribe(
      (data) => {
        alert('Proveedor Eliminado');
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
}
