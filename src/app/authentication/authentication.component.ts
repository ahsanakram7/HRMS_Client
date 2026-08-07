import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  signUpVisible: boolean = false;

  loginModal: Login;
  registerModal: Register;

  inValidUserName: string = "";
  inValidPassword: string = "";

  constructor(private authService: AuthService,
              private router: Router) {
    this.loginModal = {
      userName: '',
      password: ''
    }
    this.registerModal = {
      userName: '',
      fullName: '',
      email: '',
      password: ''
    }
  }

  ngOnInit(): void {
  }

  signUpShow(){
    this.signUpVisible = true;
  }

  LoginShow(){
    this.signUpVisible = false;
  }

  login(){
    this.authService.login(this.loginModal).subscribe({
      next: (res) => {
        
        this.authService.saveToken(res.token);

        this.authService.saveUser(res.user);

        this.router.navigate(['/dashboard']);
      
      },
      error: (err) => {

        if(err.status == 400){

          this.inValidUserName = err.error.errors.UserName;
          this.inValidPassword = err.error.errors.Password;

          // Swal.fire({
          //   html: [(err.error.errors.UserName || []) + "<br><br>" + (err.error.errors.Password || []) ],
          //   icon: "warning"
          // });
        }
        else if(err.status == 401){

          this.inValidUserName = "";
          this.inValidPassword = "";

          Swal.fire({
            text: err.error,
            icon: "error"
          });

          this.authService.logout();
        }
      }
    })
  }

}
