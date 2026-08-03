import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { employee } from '../employee.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private headers: HttpHeaders;
  private params: HttpParams;

  constructor(private client: HttpClient) {

    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.params = new HttpParams();

  }

  fnGetAllEmployees(search_emp_Info: employee,pageIndex?: number, pageSize?: number){

    var obj = JSON.stringify(search_emp_Info);

    var options = {
      headers: this.headers,
      params: this.params
    }

    return this.client.get('https://localhost:7082/api/Employee/getAllEmployees?obj='+ encodeURIComponent(obj) +'&r='+ pageIndex + '&p=' + pageSize, options);

  }

  fnGetEmployeeById(Id: number){

    var options = {
      headers: this.headers,
      params: this.params
    }

    return this.client.get('https://localhost:7082/api/Employee/getEmployeeById?Id='+ Id , options);

  }

  fnSaveEmployee(emp_Info: employee){

    var obj = JSON.stringify(emp_Info);

    var options = {
      headers: this.headers,
      params: this.params
    }

    return this.client.get('https://localhost:7082/api/Employee/saveEmployee?obj='+ encodeURIComponent(obj), options);

  }

  fnUpdateEmployee(emp_Info: employee){

    var obj = JSON.stringify(emp_Info);

    var options = {
      headers: this.headers,
      params: this.params
    }

    return this.client.get('https://localhost:7082/api/Employee/updateEmployee?obj='+ encodeURIComponent(obj), options);

  }

  fnDeleteEmp(Id: number){

    var options = {
      headers: this.headers,
      params: this.params
    }

    return this.client.get('https://localhost:7082/api/Employee/deleteEmployee?Id='+ Id , options);

  }

}
