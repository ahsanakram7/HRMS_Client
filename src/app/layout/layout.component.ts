import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ScreenService } from '../services/screen.service';
import { Screens } from '../models/screen';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  user: any;

  screens: Screens[] = [];

  constructor(public authService: AuthService,
              public screenService: ScreenService,
              private router: Router) 
  { }

  ngOnInit(): void {

    this.user = this.authService.getUser();

    this.fnGetAllScreens();

  }

  fnGetAllScreens(){
    this.screenService.fnGetAllScreensBasic().subscribe({
      next: (res) => {
        this.screens = res as Screens[];
      },
      error: (err) => {

      }
    })
  }

  logout(){

    this.authService.logout();
    this.router.navigate(['/']);
  
  }

}
