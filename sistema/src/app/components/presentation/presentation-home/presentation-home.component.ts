import { Component, OnInit } from '@angular/core';
import { PresentacionService } from '../servicios/presentacion.service';
import { HttpClient } from '@angular/common/http';
import { Presentation } from '../interfaces/presentation';

@Component({
  selector: 'app-presentation-home',
  templateUrl: './presentation-home.component.html',
  styleUrls: ['./presentation-home.component.css']
})
export class PresentationHomeComponent implements OnInit {

  API_ENDPOINT = 'http://localhost:3000/';
  presentation: Presentation[];
  constructor(
    private presentationService: PresentacionService,
    private httpClient: HttpClient
  ) {
    httpClient
      .get(this.API_ENDPOINT + 'presentation')
      .subscribe((data: Presentation[]) => {
        this.presentation = data; 
        console.log(this.presentation);
      });
  }
  ngOnInit() {}
  delete(id) {
    this.presentationService.delete(id).subscribe(
      (data) => {
        alert('Presentacion Eliminado');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
