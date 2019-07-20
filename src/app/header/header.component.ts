import { Component, OnInit, Input } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() admin=false;
  constructor(private loginAuth:AuthenticateService,private router:Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("role") == "admin"){
      this.admin = true;
    }
  }

logOut(){
  this.loginAuth.logOut();
  this.router.navigate(["/"])
}

}
