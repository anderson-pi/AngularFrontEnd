import { Component, OnInit } from '@angular/core';
import { LeaveRequest, TrainingRequest, MeetingRequest } from '../models';
import { HttpClientService } from '../service/http-client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NumberValueAccessor } from '@angular/forms';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import {Location} from '@angular/common'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  allLeaveRequests: LeaveRequest;
  allTrainingRequests: TrainingRequest;
  allMeetingRequests: MeetingRequest[];
  empList;
  searchName: boolean = true;
  searchText: string = ""
  typeSearch;
  searchRequest: any;
  //task inputs
  startDate;
  endDate;
  reason;
  name;
  empName;
  empId;
  //new employee
  fname;
  lname;
  contact;
  dept;
  //create Department
  deptName;
  //create training room
  tRoomName;
  tCapacity;
  tFloor;
  whiteBoard;
  projector;
  //create meeting room
  mRoomName;
  mCapacity;
  mFloor;

  constructor(private location:Location, private http: HttpClientService, private router:Router,private modalService: NgbModal) { }

  ngOnInit() {
    this.http.getAllLeaveRequest().subscribe(
      data => {
        this.allLeaveRequests = data;
      }
    )

    this.http.getAllTrainingRequest().subscribe(
      data => {
        this.allTrainingRequests = data;
      }
    )

    this.http.getAllMeetingRequest().subscribe(
      data => {
        data.forEach(element => {
          element.day = this.http.getDate(element.startTime);
          element.startTime = this.http.getStartTime(element.startTime);
          element.endTime = this.http.getEndTime(element.endTime);

        });
        this.allMeetingRequests = data;
      }
    )
  }

  setInputFalse() {
    this.searchName = false;
  }
  setInputTrue() {
    this.searchName = true;
    this.searchText = ""
  }
  open(content) {
    switch (this.typeSearch) {
      case "allDept": {
        this.http.getAllDepts().subscribe(
          data => {
            this.searchRequest = data;
          }
        )
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
        break;
      }
      case "allEmp": {
        this.http.getAllEmps().subscribe(
          data => {
            this.searchRequest = data;
          }
        )
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
        break;
      }
      case "empLast": {
        this.http.getEmpByLastName(this.searchText).subscribe(
          data => {
            this.searchRequest = data;
          }
        )
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
        break;
      }
      case "deleteEmp": {
        this.http.deleteEmp(this.searchText).subscribe(
          data => {this.searchText = "Employee Deleted"} 
        )
        break;
      }
      case "deleteDept": {
        this.http.deleteDept(this.searchText).subscribe(
          data => {this.searchText = "Department Deleted"} 
        )
        break;
      }
      
    }
  }

  openTask(task) {
    this.http.getAllEmps().subscribe(
      data => {
        this.empList = data;
      }
    )
    this.modalService.open(task, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.http.createTask(this.startDate, this.endDate, this.reason,
        this.name, this.empId, parseInt(sessionStorage.getItem("id"))).subscribe();
    }, (reason) => {});
    this.startDate=null
    this.endDate= null
    this.reason = null
    this.name = null
    this.empId=null
    this.empName=null
  }
  openNewEmp(emp) {
    this.modalService.open(emp, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.http.creatEmployee(this.fname,this.lname,this.contact,this.dept).subscribe();
    }, (reason) => {});
    this.fname =null;
    this.lname=null;
    this.contact=null;
    this.dept=null;
  }
  openNewDept(dpt){
    this.modalService.open(dpt, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.http.creatDepartment(this.deptName).subscribe();
    }, (reason) => {});
    this.deptName = null;
  }
  openNewTraining(training){
    this.modalService.open(training, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.http.createTrainingRoom(this.tRoomName,this.tCapacity,this.tFloor,this.projector,this.whiteBoard).subscribe();
    }, (reason) => {});
    this.tRoomName=null;
    this.tCapacity=null;
    this.tFloor=null;
    this.projector=null;
    this.whiteBoard=null;
  }
  openNewMeeting(meeting){
    this.modalService.open(meeting, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.http.createMeetingRoom(this.mRoomName,this.mCapacity,this.mFloor).subscribe()
    }, (reason) => {});
    this.mRoomName=null;
    this.mCapacity=null;
    this.mFloor=null;
  }
  yesWhiteBoard(){
    this.whiteBoard =true;
  }
  noWhiteBoard(){
    this.whiteBoard =false;
  }
  yesProjector(){
    this.projector =true;
  }
  noProjector(){
    this.projector =false;
  }


  approveMeeting(request){
    this.http.approveMeeting(request).subscribe();
    this.router.navigateByUrl("/home",{skipLocationChange: true}).then(()=>{
      this.router.navigate([decodeURI(this.location.path())])
    })
    
  }
  denyMeeting(request){
    this.http.denyMeeting(request).subscribe();
    this.router.navigateByUrl("/home",{skipLocationChange: true}).then(()=>{
      this.router.navigate([decodeURI(this.location.path())])
    })
  }
  approveTraining(request){
    this.http.approveTraining(request).subscribe();
    this.router.navigateByUrl("/home",{skipLocationChange: true}).then(()=>{
      this.router.navigate([decodeURI(this.location.path())])
    })
  }
  denyTraining(request){
    this.http.denyTraining(request).subscribe();
    this.router.navigateByUrl("/home",{skipLocationChange: true}).then(()=>{
      this.router.navigate([decodeURI(this.location.path())])
    })
  }
  approveLeave(request){
    this.http.approveLeave(request).subscribe();
    this.router.navigateByUrl("/home",{skipLocationChange: true}).then(()=>{
      this.router.navigate([decodeURI(this.location.path())])
    })
  }
  denyLeave(request){
    this.http.denyLeave(request).subscribe();
    this.router.navigateByUrl("/home",{skipLocationChange: true}).then(()=>{
      this.router.navigate([decodeURI(this.location.path())])
    })
  }

  selectEmpForTask(request){
    this.empName = request.firstName + " " + request.lastName;
    this.empId = request.empId
    console.log(this.empId)

  }


}
