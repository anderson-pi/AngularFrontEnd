import { Component, OnInit, Input } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { HttpClientService } from '../service/http-client.service';
import { Location } from '@angular/common'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private spinner:NgxSpinnerService,private location: Location, private http: HttpClientService, private loginAuth: AuthenticateService, private router: Router) { }
  currentTemp;
  weatherCity = ""
  ngOnInit() {
    this.http.getIpCliente().subscribe(data => {
      let zip = data["ip"].split(',')
      this.http.getLongLat(zip[0]).subscribe(postal => {
        this.http.getWeather(postal["postal"]).subscribe(data => {
        this.currentTemp = data["main"]["temp"];
        })
      })
    })
  }

  searchWeatherbyCity(){
    this.spinner.show()
    this.http.getWeatherByCity(this.weatherCity).subscribe(data=>{
      this.currentTemp = data["main"]["temp"];
    },
    error=>{
      this.weatherCity = "No location found"
    })
    this.spinner.hide()
  }

  logOut() {
    this.loginAuth.logOut();
    this.router.navigate(["/"])
  }
  checkCreds() {
    if (sessionStorage.getItem("role") == "admin") {
      this.router.navigate(["/admin"])
    } else {
      this.router.navigateByUrl("/admin", { skipLocationChange: true }).then(() => {
        this.router.navigate([decodeURI(this.location.path())])
      })
    }
  }



}
