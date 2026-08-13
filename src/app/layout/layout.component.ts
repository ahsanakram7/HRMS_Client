import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  user: any;

  constructor(public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    this.user = this.authService.getUser();

  }

  logout(){

    this.authService.logout();
    this.router.navigate(['/']);
  
  }

}
