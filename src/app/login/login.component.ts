import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service';
import {FormGroup,Validators,FormBuilder} from '@angular/forms'
import { HttpClientService } from '../service/http-client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  public form = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  })
  newID;
  newUser;
  newPword;
  isError = false;
  
  error:string=""

  constructor(private modalService: NgbModal,private http:HttpClientService ,private router: Router, private loginAuth: AuthenticateService,private fb:FormBuilder) { }

  ngOnInit() {
  }

  public login(form: FormGroup) {
    this.loginAuth.authenticate(form.controls.username.value, form.controls.password.value).subscribe(
      data => {
        sessionStorage.setItem("token", data.token)
        sessionStorage.setItem("username",form.controls.username.value )
        this.http.findUserIdByLogin(form.controls.username.value).subscribe(
          emp => {
            sessionStorage.setItem("name",emp.firstName)
            sessionStorage.setItem("id",emp.empId.toString())
            this.http.getUserRole(form.controls.username.value).subscribe(
              role=> sessionStorage.setItem("role",role["returnText"])
            )
          this.router.navigate(['/home'])}
        );
      },
        error => {
          this.isError=true;
          this.error = "Sorry, Invalid Credentials!";
        form.reset;
      }
    )
    

    
  }
  register(reg){
    this.modalService.open(reg, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.http.register(this.newUser,this.newPword,this.newID).subscribe( data =>{
        this.isError=false;
        this.error = "Registration Complete!";
      },
      error => {
        this.isError=true;
        this.error = "Sorry, Contact Admin!";
      
    });
    }, (reason) => {});
    
  }

}
