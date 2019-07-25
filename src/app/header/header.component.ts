import { Component, OnInit, Input } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { HttpClientService } from '../service/http-client.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpClientService, private loginAuth: AuthenticateService, private router: Router) { }
  currentTemp;
  ngOnInit() {
    this.http.getWeather().subscribe(data => {
      this.currentTemp = data["main"]["temp"];
      console.log(this.currentTemp)
    })
  }

  logOut() {
    this.loginAuth.logOut();
    this.router.navigate(["/"])
  }
  checkCreds() {
    if (sessionStorage.getItem("role") == "admin") {
      this.router.navigate(["/admin"])
    }
  }


}
