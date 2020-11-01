import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../servicios/providers.service';
import { Providers } from '../interfaces/providers';
import { Router} from '@angular/router';


@Component({
  selector: 'app-providers-home',
  templateUrl: './providers-home.component.html',
  styleUrls: ['./providers-home.component.css'],
})
export class ProvidersHomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:3000/';
  providers: Providers[];

  constructor(
    private providersService: ProvidersService, private router: Router,
  ) {


    this.providersService.getProviders().subscribe((data: Providers[]) => {
      this.providers = data;
    });;
   /* httpClient.get(this.API_ENDPOINT + 'providers',{headers:headers})
      .subscribe((data: Providers[]) => {
        this.providers = data; 
        console.log(this.providers);
      });*/
  }

searchTerm3 = '';

  ngOnInit() {}
  delete(id) {
    this.providersService.delete(id).subscribe(
      (data) => {
        alert('Proveedor Eliminado');
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
}
