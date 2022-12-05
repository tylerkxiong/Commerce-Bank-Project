import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginuserService {

  //private baseUrl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) { }


  loginUser(user : LoginpageComponent):Observable<object>{
    return this.httpClient.post('${this.baseUrl}', user);
  }


}
