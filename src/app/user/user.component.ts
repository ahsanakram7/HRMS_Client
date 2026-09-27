import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { userResponse } from '../models/user-response';
import { user } from '../models/user';
import { roleResponse } from '../models/role-response';
import { role } from '../models/role';
import { ScreenService } from '../services/screen.service';
import { Screens } from '../models/screen';
import { roleActivities } from '../models/role-activities';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  ////////////////// User Managament ///////////////////////

  showListArea: boolean = true;

  pageSize?: number = 10;
  pageIndex?: number = 0; 
  pagelength?: number;

  userResponse: userResponse;

  rolesActivity: roleActivities;
  rolesActivities: roleActivities[] = [];

  users: user[] = [];
  user: user;

  screens: Screens[] = [];

  disableControls: boolean = false;
  btnText: string = '';
  btnVisibility: boolean = false;

  btnTextFormHeader: string = '';

  hide = true;

  constructor(private userService: UserService,
              private screenService: ScreenService
  ) {

    this.userResponse = {
      users: [],
      totalRecords: 0
    }

    this.user = {
      id: '',
      fullName: '',
      userName: '',
      email: '',
      phoneNumber: '',
      passwordHash: '',
      role: ''
    }

    this.showListArea = true;

    this.roleResponse = {
      roles: [],
      totalRecords: 0
    }

    this.role = {
      id: '',
      name: '',
    }

    this.showListAreaRole = true;

    this.rolesActivity = {
      role: '',
      screen: '',
      canView: false,
      canAdd: false,
      canEdit: false,
      canDelete: false
    }
  }

  ngOnInit(): void {
    this.fnGetAllUsers();
    this.fnGetAllRoles();
  }

  BackToList(){
    this.showListArea = true;
  }

  pageChangeEvent(e: PageEvent){
    this.pagelength = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.fnGetAllUsers();
  }

  showUserAddForm(){
    this.showListArea = false;
    this.disableControls = false;

    this.btnText = "Save";
    this.btnTextFormHeader = "Add User";

    this.btnVisibility = true;

    this.user = {
      id: '',
      fullName: '',
      userName: '',
      email: '',
      phoneNumber: '',
      passwordHash: '',
      role: ''
    }
  }

  searchUser(value: string){
  
      this.userService.fnGetAllUsers(value ,this.pageIndex, this.pageSize).subscribe({
  
        next: (res) => {
  
          this.userResponse = res as userResponse;
  
          this.users = this.userResponse.users;
          this.pagelength = this.userResponse.totalRecords;
  
          console.log(res);
  
        },
        error: (err) => {
  
          console.log(err)
        
        }
  
      })
  }

  // fnGetAllScreens(){

  //   this.screenService.fnGetAllScreensBasic().subscribe({
  //     next: (res) => {

  //       this.screens = res as Screens[];

  //       for (let screen of this.screens) 
  //       {
  //         let screenActivity = {
  //           role: this.user.role,
  //           screen: screen.name,
  //           canView: false,
  //           canAdd: false,
  //           canEdit: false,
  //           canDelete: false
  //         }

  //         this.rolesActivities.push(screenActivity); 
  //       }

  //       console.log(res);
  //     },
  //     error: (err) => {

  //     }
  //   })
  // }

  fnGetAllRolesActivities(){

    this.userService.fnGetAllRolesActivities(this.user.role).subscribe({
      next: (res) => {

        this.rolesActivities = res as roleActivities[];

        console.log(res);
      },
      error: (err) => {

      }
    })
  }

  fnSaveRoleActivities(){

    this.userService.fnSaveRoleActivities(this.rolesActivities).subscribe({
        
        next: (res) => {

          Swal.fire({
            title: 'Saved!',
            text: 'Role Activities saved successfully.',
            icon: 'success'
          });

        },
        error: (err) => {
          console.log(err);
        }
      
      })
  }

  toggleAllroleActivities(checked: boolean){

    this.rolesActivities.forEach(screen => {
      screen.canAdd = checked;
      screen.canView = checked;
      screen.canEdit = checked;
      screen.canDelete = checked;
    })
  }
  

  fnGetAllUsers(){
    this.userService.fnGetAllUsers('',this.pageIndex, this.pageSize).subscribe({
      next: (res) => {

        this.userResponse = res as userResponse;
  
        this.users = this.userResponse.users;
        this.pagelength = this.userResponse.totalRecords;

        console.log(res);
      },
      error: (err) => {

      }
    })
  }

  fnGetUserById(id: string, type: string){
    this.userService.fnGetUserById(id).subscribe({
      next: (res) => {

        this.user = res as user;

        this.user.passwordHash = '';

        this.showListArea = false;

        if(type == 'view'){
          this.disableControls = true;
          this.btnVisibility = false;
          this.btnTextFormHeader = "View User";
        }
        else if(type == 'edit'){
          this.disableControls = false;
          this.btnVisibility = true;
          this.btnText = "Edit";
          this.btnTextFormHeader = "Edit User";
        }

        console.log(res);

      },
      error: (err) => {

      }
    })
  }

  fnSaveUser(){
    if(this.btnText == "Save"){
    
      this.userService.fnSaveUser(this.user).subscribe({
        
        next: (res) => {

          Swal.fire({
            title: 'Saved!',
            text: 'User saved successfully.',
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed) {
              this.fnGetAllUsers();
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

      this.userService.fnUpdateUser(this.user).subscribe({
        
        next: (res) => {

          Swal.fire({
            title: 'Updated!',
            text: 'User updated successfully.',
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed) {
              this.fnGetAllUsers();
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

  fnDeleteUser(id: string){
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
            
            this.userService.fnDeleteUser(id).subscribe({
              next: (res: any) => {
    
                if(res.message == "User deleted successfully."){
                  Swal.fire({
                    title: 'Deleted!',
                    text: 'User has been deleted.',
                    icon: 'success'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.fnGetAllUsers();
                      this.BackToList();
                    }
                  });
                }
                else{
                  Swal.fire({
                    title: 'Error!',
                    text: 'User has not found.',
                    icon: 'error'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.fnGetAllUsers();
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

  ////////////////// Role Managament ///////////////////////

  showListAreaRole: boolean = true;

  pageSizeRole?: number = 10;
  pageIndexRole?: number = 0; 
  pagelengthRole?: number;

  roleResponse: roleResponse;

  roles: role[] = [];
  role: role;

  disableControlsRole: boolean = false;
  btnTextRole: string = '';
  btnVisibilityRole: boolean = false;

  btnTextFormHeaderRole = "";

  hideRole = true;

  
  BackToListRole(){
    this.showListAreaRole = true;
  }

  pageChangeEventRole(e: PageEvent){
    this.pagelengthRole = e.length;
    this.pageSizeRole = e.pageSize;
    this.pageIndexRole = e.pageIndex;

    this.fnGetAllRoles();
  }

  showUserAddFormRole(){
    this.showListAreaRole = false;
    this.disableControlsRole = false;

    this.btnTextRole = "Save";
    this.btnVisibilityRole = true;

    this.btnTextFormHeaderRole = "Add Role";

    this.role = {
      id: '',
      name: ''
    }
  }

  searchRole(value: string){
  
      this.userService.fnGetAllRoles(value ,this.pageIndexRole, this.pageSizeRole).subscribe({
  
        next: (res) => {
  
          this.roleResponse = res as roleResponse;
  
          this.roles = this.roleResponse.roles;
          this.pagelength = this.roleResponse.totalRecords;
  
          console.log(res);
  
        },
        error: (err) => {
  
          console.log(err)
        
        }
  
      })
  }
  

  fnGetAllRoles(){
    this.userService.fnGetAllRoles('',this.pageIndexRole, this.pageSizeRole).subscribe({
      next: (res) => {

        this.roleResponse = res as roleResponse;
  
        this.roles = this.roleResponse.roles;
        this.pagelength = this.roleResponse.totalRecords;
  

        console.log(res);
      },
      error: (err) => {

      }
    })
  }

  fnGetRoleById(id: string, type: string){
    this.userService.fnGetRoleById(id).subscribe({
      next: (res) => {

        this.role = res as role;

        this.showListAreaRole = false;

        if(type == 'view'){
          this.disableControlsRole = true;
          this.btnVisibilityRole = false;
          this.btnTextFormHeaderRole = "View Role";
        }
        else if(type == 'edit'){
          this.disableControlsRole = false;
          this.btnVisibilityRole = true;
          this.btnTextRole = "Edit";
          this.btnTextFormHeaderRole = "Edit Role";
        }

        console.log(res);

      },
      error: (err) => {

      }
    })
  }

  fnSaveRole(){
    if(this.btnTextRole == "Save"){
    
      this.userService.fnSaveRole(this.role).subscribe({
        
        next: (res) => {

          Swal.fire({
            title: 'Saved!',
            text: 'Role saved successfully.',
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed) {
              this.fnGetAllRoles();
              this.BackToListRole();
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

      this.userService.fnUpdateRole(this.role).subscribe({
        
        next: (res) => {

          Swal.fire({
            title: 'Updated!',
            text: 'Role updated successfully.',
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed) {
              this.fnGetAllRoles();
              this.BackToListRole();
            }
          });

        },
        error: (err) => {
          console.log(err);
        }
      
      })

    }
  }

  fnDeleteRole(id: string){
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
          
          this.userService.fnDeleteRole(id).subscribe({
            next: (res: any) => {
  
              if(res.message == "Role deleted successfully."){
                Swal.fire({
                  title: 'Deleted!',
                  text: 'Role has been deleted.',
                  icon: 'success'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.fnGetAllRoles();
                    this.BackToListRole();
                  }
                });
              }
              else{
                Swal.fire({
                  title: 'Error!',
                  text: 'Role has not found.',
                  icon: 'error'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.fnGetAllRoles();
                    this.BackToListRole();
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