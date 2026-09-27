import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Screens } from '../models/screen';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(private client: HttpClient) { }

  

  fnGetAllScreensBasic()
  {    
    return this.client.get(`${environment.apiUrl}/Screens/getAllScreensBasic`);
  }

  fnGetAllScreens(screenName: string | null, pageIndex?: number, pageSize?: number)
  {    
    return this.client.get(`${environment.apiUrl}/Screens/getAllScreens?obj=${encodeURIComponent(screenName?.trim() ?? '')}&r=${pageIndex}&p=${pageSize}`);
  }
  
  fnGetScreenById(id: number)
  {    
    return this.client.get(`${environment.apiUrl}/Screens/getScreenById?Id=${encodeURIComponent(id ?? '')}`);
  }

  fnSaveScreen(screen: Screens){
    console.log(screen);
    return this.client.post(`${environment.apiUrl}/Screens/saveScreen`, screen);
  }

  fnUpdateScreen(screen: Screens){
    return this.client.post(`${environment.apiUrl}/Screens/updateScreen`, screen);
  }

  fnDeleteScreen(id: number){
    return this.client.get(`${environment.apiUrl}/Screens/deleteScreen?id=${encodeURIComponent(id ?? '')}`);
  }

}
