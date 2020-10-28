import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {EmployeePosition} from '../interfaces/employee-position';

@Injectable({
  providedIn: 'root'
})
export class EmployeePositionService {

  API_ENDPOINT = 'http://localhost:3000/';
   
  employeePosition=[];
  constructor(private httpClient: HttpClient) {
    httpClient.get(this.API_ENDPOINT + 'employee_position')
      .subscribe((data: EmployeePosition[]) => {
        this.employeePosition = data;
      });
   }

   getPosition(){
    return this.httpClient.get(this.API_ENDPOINT + 'employee_position' );
  }

   save(employeePosition: EmployeePosition){
     console.log(employeePosition);
     const headers = new HttpHeaders({'Content-Type': 'application/json', 'accesstoken':localStorage.getItem('token')});
     return this.httpClient.post(this.API_ENDPOINT + 'employee_position', employeePosition, {headers: headers});
   }
   put(employeePosition) { //Le llamaremos put para fines practicos
    const headers = new HttpHeaders({ 'ContentType': 'application/json' }); 
    return this.httpClient.put(this.API_ENDPOINT + 'employee_position/' + employeePosition.Employee_Position_Id, employeePosition, { headers: headers }); 
  }
  delete(id) {
    const headers = new HttpHeaders({ 'ContentType': 'application/json' });
    return this.httpClient.delete(this.API_ENDPOINT + 'employee_position/' + id,{headers:headers});
  }

}
 