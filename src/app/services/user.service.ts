import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { user } from '../models/user';
import { role } from '../models/role';
import { roleActivities } from '../models/role-activities';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client: HttpClient) {}

  /////////////////User Services////////////////////////////

  fnGetAllUsers(userName: string, pageIndex?: number, pageSize?: number)
  {    
    return this.client.get(`${environment.apiUrl}/Auth/getAllUsers?userName=${encodeURIComponent(userName ?? '')}&r=${pageIndex}&p=${pageSize}`);
  }

  fnGetUserById(id: string)
  {    
    return this.client.get(`${environment.apiUrl}/Auth/getUserById?id=${encodeURIComponent(id ?? '')}`);
  }

  fnSaveUser(user: user){
    //var obj = JSON.stringify(user);
    return this.client.post(`${environment.apiUrl}/Auth/CreateUser`, user);
  }

  fnUpdateUser(user: user){
    //var obj = JSON.stringify(user);
    return this.client.post(`${environment.apiUrl}/Auth/EditUser`, user);
  }

  fnDeleteUser(id: string){
    return this.client.get(`${environment.apiUrl}/Auth/DeleteUser?id=${encodeURIComponent(id ?? '')}`);
  }

  /////////////////Roles Services////////////////////////////

  fnGetAllRoles(Name: string, pageIndex?: number, pageSize?: number)
  {    
    return this.client.get(`${environment.apiUrl}/Auth/getAllRoles?name=${encodeURIComponent(Name ?? '')}&r=${pageIndex}&p=${pageSize}`);
  }

  fnGetRoleById(id: string)
  {    
    return this.client.get(`${environment.apiUrl}/Auth/getRoleById?id=${encodeURIComponent(id ?? '')}`);
  }

  fnSaveRole(role: role){
    //var obj = JSON.stringify(user);
    return this.client.post(`${environment.apiUrl}/Auth/CreateRole`, role);
  }

  fnUpdateRole(role: role){
    //var obj = JSON.stringify(user);
    return this.client.post(`${environment.apiUrl}/Auth/EditRole`, role);
  }

  fnDeleteRole(id: string){
    return this.client.get(`${environment.apiUrl}/Auth/DeleteRole?id=${encodeURIComponent(id ?? '')}`);
  }

  /////////////////Roles Activities Services////////////////////////////

  fnGetAllRolesActivities(role: string)
  {    
    return this.client.get(`${environment.apiUrl}/RoleActivities/getAllRoleActivities?role=${role}`);
  }

  fnSaveRoleActivities(roleActivities: roleActivities[]){
    //var obj = JSON.stringify(user);
    return this.client.post(`${environment.apiUrl}/RoleActivities/UpdateRoleActivities`, roleActivities);
  }
  
}
