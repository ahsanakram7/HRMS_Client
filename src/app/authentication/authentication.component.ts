import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  signUpVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  signUpShow(){
    this.signUpVisible = true;
  }

  LoginShow(){
    this.signUpVisible = false;
  }

}
