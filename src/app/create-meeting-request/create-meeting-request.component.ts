import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTimeStruct, NgbTimepickerModule, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-meeting-request',
  templateUrl: './create-meeting-request.component.html',
  styleUrls: ['./create-meeting-request.component.css']
})
export class CreateMeetingRequestComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) { }

  meetingForm: FormGroup;
  startDate: FormControl;
  startTime: FormControl;
  endTime: FormControl;
  reason: FormControl;
  filled:boolean = false;
  minuteStep:number = 30;
 


  onSelect(form: FormGroup) {
    
   this.filled = true;
    
  }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
    console.log(this.meetingForm.controls.startDate.value)
  }

  createForm() {
    this.meetingForm = this.fb.group({
      startDate: this.startDate,
      reason: this.reason,
      startTime: this.startTime,
      endTime: this.endTime
    })

  }
  createFormControls() {
    this.startDate = new FormControl("", [Validators.required]);
    this.reason = new FormControl("", [Validators.required, Validators.minLength(10)]);
    this.startTime = new FormControl(0, [Validators.required]);
    this.endTime = new FormControl(0, [Validators.required]);
  }

}
