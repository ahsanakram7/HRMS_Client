import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuard } from './gaurds/auth.guard';
import { LoginGuard } from './gaurds/login.guard';
import { RoleGuard } from './gaurds/role.guard';

const routes: Routes = [
  {path: '', component: AuthenticationComponent, canActivate:[LoginGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'employee', component: EmployeeComponent, canActivate:[AuthGuard,RoleGuard], data:{ roles:['Admin']} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
