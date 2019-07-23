import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
  "Content-Type": "application/json",
  "Authorization": "my-jwt-token"
})}

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private httpClient:HttpClient) { }

  authenticate(username:string, password:string):Observable<any>{
    return this.httpClient.post<any>("http://localhost:8082/auth",JSON.stringify({userName: username, passWord: password}),httpOptions);

  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem("username");
    return !(user == null);
  }
  logOut(){
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    console.log(sessionStorage.getItem("username"));
    console.log(sessionStorage.getItem("token"));
  }

}
