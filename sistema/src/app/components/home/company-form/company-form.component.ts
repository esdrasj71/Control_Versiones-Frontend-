import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Company} from '../interface/company';
import {CompanyService} from '../servicios/company.service';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';
@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  company:Company = {
    Company_Id:null,
    Company_Name:null,
    Address:null,
    NIT: null
  }; 
  id: any;
  postarr: Company[];
  API_ENDPOINT = 'http://localhost:3000/';
  constructor(private activatedRoute: ActivatedRoute,private router: Router,private companyService:CompanyService) 
  { 
    this.id = this.activatedRoute.snapshot.params['id'];
    this.companyService.getCompany().subscribe((data: Company[]) => { 
      this.postarr = data;
      this.company = this.postarr.find((m) => { return m.Company_Id == this.id });
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {
  }

  savePost()
  {
    this.companyService.put(this.company).subscribe((data) => { 
      Swal.fire('Compañia agregada', '','success');
      this.router.navigate(['/home']);
      console.log(data)
    }, (error) => {
      console.log(error);
      Swal.fire({icon: 'error', title: 'Ocurrio un error', text: ''})
    });
  }
}