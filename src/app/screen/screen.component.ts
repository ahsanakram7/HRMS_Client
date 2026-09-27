import { Component, OnInit } from '@angular/core';
import { ScreenService } from '../services/screen.service';
import { PageEvent } from '@angular/material/paginator';
import { Screens } from '../models/screen';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {

  showListArea: boolean = true;
  
  pageSize?: number = 10;
  pageIndex?: number = 0; 
  pagelength?: number;

  screens: Screens[] = [];
  ScreenInterface: Screens;
  
  disableControls: boolean = false;
  btnText: string = '';
  btnVisibility: boolean = false;
  
  btnTextFormHeader: string = '';
  
  constructor(private screenService: ScreenService) {
      this.ScreenInterface = {
        id: 0,
        name: '',
        icon: '',
        isActive: false,
        route: '',
        totalRecords: 0
      }
  
      this.showListArea = true;
    }
  
    ngOnInit(): void {
      this.fnGetAllScreens();
    }
  
    BackToList(){
      this.showListArea = true;
    }
  
    pageChangeEvent(e: PageEvent){
      this.pagelength = e.length;
      this.pageSize = e.pageSize;
      this.pageIndex = e.pageIndex;
  
      this.fnGetAllScreens();
    }
  
    showScreenAddForm(){
      this.showListArea = false;
      this.disableControls = false;
  
      this.btnText = "Save";
      this.btnTextFormHeader = "Add Screen";
  
      this.btnVisibility = true;
  
      this.ScreenInterface = {
        id: 0,
        name: '',
        icon: '',
        isActive: false,
        route: '',
        totalRecords: 0
      }
    }
  
    searchScreen(value: string){
    
        this.screenService.fnGetAllScreens(value ,this.pageIndex, this.pageSize).subscribe({
    
          next: (res) => {
    
            this.screens = res as Screens[];
    
            console.log(res);
    
          },
          error: (err) => {
    
            console.log(err)
          
          }
    
        })
    }
    
  
    fnGetAllScreens(){
      this.screenService.fnGetAllScreens('',this.pageIndex, this.pageSize).subscribe({
        next: (res) => {
  
          this.screens = res as Screens[];
  
          console.log(res);
        },
        error: (err) => {
  
        }
      })
    }
  
    fnGetScreenById(id: number, type: string){
      this.screenService.fnGetScreenById(id).subscribe({
        next: (res) => {
  
          this.ScreenInterface = res as Screens;
  
          this.showListArea = false;
  
          if(type == 'view'){
            this.disableControls = true;
            this.btnVisibility = false;
            this.btnTextFormHeader = "View Screen";
          }
          else if(type == 'edit'){
            this.disableControls = false;
            this.btnVisibility = true;
            this.btnText = "Edit";
            this.btnTextFormHeader = "Edit Screen";
          }
  
          console.log(res);
  
        },
        error: (err) => {
  
        }
      })
    }
  
    fnSaveScreen(){
      if(this.btnText == "Save"){
      
        this.screenService.fnSaveScreen(this.ScreenInterface).subscribe({
          
          next: (res) => {
  
            Swal.fire({
              title: 'Saved!',
              text: 'Screen saved successfully.',
              icon: 'success'
            }).then((result) => {
              if (result.isConfirmed) {
                this.fnGetAllScreens();
                this.BackToList();
              }
            });
  
          },
          error: (err) => {
  
            console.log(err);
  
            if(err.status == 400){
  
              Swal.fire({
                text: err.error[0].description,
                icon: "warning"
              });
            }
            else if(err.status == 401){
  
              Swal.fire({
                text: err.error,
                icon: "error"
              });
  
            }
  
          }
        
        })
  
      }
      else{
  
        this.screenService.fnUpdateScreen(this.ScreenInterface).subscribe({
          
          next: (res) => {
  
            Swal.fire({
              title: 'Updated!',
              text: 'Screen updated successfully.',
              icon: 'success'
            }).then((result) => {
              if (result.isConfirmed) {
                this.fnGetAllScreens();
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
  
    fnDeleteScreen(id: number){
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
              
              this.screenService.fnDeleteScreen(id).subscribe({
                next: (res: any) => {
      
                  if(res.message == "deleted"){
                    Swal.fire({
                      title: 'Deleted!',
                      text: 'Screen has been deleted.',
                      icon: 'success'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        this.fnGetAllScreens();
                        this.BackToList();
                      }
                    });
                  }
                  else{
                    Swal.fire({
                      title: 'Error!',
                      text: 'Screen has not found.',
                      icon: 'error'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        this.fnGetAllScreens();
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
