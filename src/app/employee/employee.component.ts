import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { employee } from '../models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  showListArea: boolean = true;

  pageSize?: number = 10;
  pageIndex?: number = 0; 
  pagelength?: number;

  searchEmployees: employee;

  employee: employee;
  employees: employee[]=[];

  disableControls: boolean;
  btnText: string = '';
  btnVisibility: boolean = false;

  constructor(private employeeService: EmployeeService) {

    this.employee = {
      emp_no: 0,
      full_name: '',
      part_full_time_flag: '', 
      religion: '',
      emp_sex: '',
      blood_group: '',
      marital_status: '',
      marital_dated: new Date,
      date_of_birth: new Date,
      country_of_birth: '',
      city_of_birth: '',
      can_travel_local: '',
      can_travel_abroad: '',
      mobile_no: '',
      official_email_add: '',
      personal_email_add: '',
      totalRecords: 0
    }

    this.searchEmployees = {
      emp_no: 0,
      full_name: '',
      part_full_time_flag: '', 
      religion: '',
      emp_sex: '',
      blood_group: '',
      marital_status: '',
      marital_dated: new Date,
      date_of_birth: new Date,
      country_of_birth: '',
      city_of_birth: '',
      can_travel_local: '',
      can_travel_abroad: '',
      mobile_no: '',
      official_email_add: '',
      personal_email_add: '',
      totalRecords: 0
    }

    this.disableControls = false;

  }

  ngOnInit(): void {

    this.fnGetAllEmployees();

  }

  showEmpAddForm(){
    this.showListArea = false;
    this.disableControls = false;

    this.btnText = "Save";
    this.btnVisibility = true;

    this.employee = {
      emp_no: 0,
      full_name: '',
      part_full_time_flag: '', 
      religion: '',
      emp_sex: '',
      blood_group: '',
      marital_status: '',
      marital_dated: new Date,
      date_of_birth: new Date,
      country_of_birth: '',
      city_of_birth: '',
      can_travel_local: '',
      can_travel_abroad: '',
      mobile_no: '',
      official_email_add: '',
      personal_email_add: '',
      totalRecords: 0
    }
  }

  BackToList(){
    this.showListArea = true;
  }

  pageChangeEvent(e: PageEvent){

    this.pagelength = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.fnGetAllEmployees();
  }

  searchEmployee(value: string){

    const empNo = Number(value);

    this.searchEmployees.emp_no = isNaN(empNo) ? 99999999 : empNo;

    this.employeeService.fnGetAllEmployees(this.searchEmployees ,this.pageIndex, this.pageSize).subscribe({

      next: (res) => {

        this.employees = res as employee[];

        this.pagelength = this.employees[0].totalRecords;

        console.log(this.employees);

      },
      error: (err) => {

        console.log(err)
      
      }

    })
  }

  fnGetAllEmployees = () => {

    this.employeeService.fnGetAllEmployees(this.searchEmployees ,this.pageIndex, this.pageSize).subscribe({

      next: (res) => {

        this.employees = res as employee[];

        this.pagelength = this.employees[0].totalRecords;

        console.log(this.employees);

      },
      error: (err) => {

        console.log(err)
      
      }

    })

  }

  fnGetEmployeeById = (Id: number, type: string) => {

    this.employeeService.fnGetEmployeeById(Id).subscribe({

      next: (res) => {

        this.employee = res as employee;

        this.showListArea = false;

        if(type == 'view'){
          this.disableControls = true;
          this.btnVisibility = false;
        }
        else if(type == 'edit'){
          this.disableControls = false;
          this.btnVisibility = true;
          this.btnText = "Edit";
        }

        console.log(this.employees);

      },
      error: (err) => {

        console.log(err)
      
      }

    })

  }

  fnSaveEmp = () => {
    if(this.btnText == "Save"){

      this.employeeService.fnSaveEmployee(this.employee).subscribe({
        
        next: (res) => {

          Swal.fire({
            title: 'Saved!',
            text: 'Employee saved successfully.',
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed) {
              this.fnGetAllEmployees();
              this.BackToList();
            }
          });

        },
        error: (err) => {
          console.log(err);
        }
      
      })

    }
    else{

      this.employeeService.fnUpdateEmployee(this.employee).subscribe({
        
        next: (res) => {

          Swal.fire({
            title: 'Saved!',
            text: 'Employee updated successfully.',
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed) {
              this.fnGetAllEmployees();
              this.BackToList();
            }
          });

        },
        error: (err) => {
          console.log(err);
        }
      
      })

    }
  }

  fnDeleteEmp = (Id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.employeeService.fnDeleteEmp(Id).subscribe({
          next: (res: any) => {

            if(res.message == "deleted"){
              Swal.fire({
                title: 'Deleted!',
                text: 'Employee has been deleted.',
                icon: 'success'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.fnGetAllEmployees();
                  this.BackToList();
                }
              });
            }
            else{
              Swal.fire({
                title: 'Error!',
                text: 'Employee has not found.',
                icon: 'error'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.fnGetAllEmployees();
                  this.BackToList();
                }
              });
            }

          },
          error: (err) => {
            console.log(err);
          }
        })
  
      }
    });
  }

}