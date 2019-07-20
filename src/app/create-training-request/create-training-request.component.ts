import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder, FormControl, Form } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-training-request',
  templateUrl: './create-training-request.component.html',
  styleUrls: ['./create-training-request.component.css']
})
export class CreateTrainingRequestComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) { }

  trainingForm: FormGroup;
  startDate: FormControl;
  endDate: FormControl;
  reason: FormControl;
  roomId:FormControl;;
  filled:boolean = false;


  onSelect(form: FormGroup) {
    
   this.filled = true;
    
  }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createForm() {
    this.trainingForm = this.fb.group({
      startDate: this.startDate,
      endDate: this.endDate,
      reason: this.reason,
      roomId:this.roomId
    })

  }
  createFormControls() {
    this.startDate = new FormControl("", [Validators.required]);
    this.endDate = new FormControl("", [Validators.required]);
    this.reason = new FormControl("", [Validators.required, Validators.minLength(10)]);
    this.roomId= new FormControl(0);
  }
}