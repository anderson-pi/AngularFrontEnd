import { Component, OnInit } from '@angular/core';

import {FormGroup,Validators,FormBuilder} from '@angular/forms'
import { HttpClientService } from '../service/http-client.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-leave-request',
  templateUrl: './create-leave-request.component.html',
  styleUrls: ['./create-leave-request.component.css']
})
export class CreateLeaveRequestComponent implements OnInit {
  public requestForm = this.fb.group({
    startDate: ["", Validators.required],
    endDate: ["", Validators.required],
    type: ["",Validators.required],
    reason: ["",Validators.required]

  })
  constructor(private spinner: NgxSpinnerService,private fb:FormBuilder, private http:HttpClientService, private router:Router){}
  ngOnInit() {
  }
onSelect(form:FormGroup){
  this.spinner.show();
  this.http.sendLeaveRequest(form,parseInt(sessionStorage.getItem("id"))).subscribe(
    data => {
      this.spinner.hide();
      this.router.navigate(["/home"])
    }
  )

}
}
