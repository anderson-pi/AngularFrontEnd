import { Component, OnInit } from '@angular/core';
import { LeaveRequest, TrainingRequest, MeetingRequest } from '../models';
import { HttpClientService } from '../service/http-client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NumberValueAccessor } from '@angular/forms';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(private spinner: NgxSpinnerService, private location: Location, private http: HttpClientService, private router: Router, private modalService: NgbModal) { }

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
    this.spinner.show();
    switch (this.typeSearch) {
      case "allDept": {
        this.http.getAllDepts().subscribe(
          data => {
            this.spinner.hide();
            this.searchRequest = data;

          }
        )
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
        break;
      }
      case "allEmp": {
        this.http.getAllEmps().subscribe(
          data => {
            this.spinner.hide();
            this.searchRequest = data;
          }
        )
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
        break;
      }
      case "empLast": {
        this.http.getEmpByLastName(this.searchText).subscribe(
          data => {
            this.spinner.hide();
            this.searchRequest = data;
          }
        )
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
        break;
      }
      case "deleteEmp": {
        this.http.deleteEmp(this.searchText).subscribe(
          data => {
            this.spinner.hide();
            this.searchText = "Employee Deleted"
          }
        )
        break;
      }
      case "deleteDept": {
        this.http.deleteDept(this.searchText).subscribe(
          data => {
            this.spinner.hide();
            this.searchText = "Department Deleted"
          }
        )
        break;
      }

    }
  }

  openTask(task, error) {
    this.http.getAllEmps().subscribe(
      data => {
        this.empList = data;
      }
    )
    this.modalService.open(task, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.spinner.show();
      if (this.startDate != null && this.endDate != null && this.reason != null &&
        this.name != null && this.empId != null) {
        this.http.createTask(this.startDate, this.endDate, this.reason,
          this.name, this.empId, parseInt(sessionStorage.getItem("id"))).subscribe();
      }
      else {
        this.spinner.hide();
        this.modalService.open(error, { ariaLabelledBy: 'modal-basic-title' })
      }
      this.spinner.hide();
    }, (reason) => { });
    this.startDate = null
    this.endDate = null
    this.reason = null
    this.name = null
    this.empId = null
    this.empName = null
  }
  openNewEmp(emp, error) {
    this.modalService.open(emp, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.spinner.show();
      if (this.fname != null && this.lname != null && this.contact != null && this.dept!= null) {
        this.http.creatEmployee(this.fname, this.lname, this.contact, this.dept).subscribe();
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.modalService.open(error, { ariaLabelledBy: 'modal-basic-title' })
      }
    }, (reason) => { });
    this.fname = null;
    this.lname = null;
    this.contact = null;
    this.dept = null;
  }
  openNewDept(dpt, error) {
    this.modalService.open(dpt, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.spinner.show();
      if (this.deptName != null) {
        this.http.creatDepartment(this.deptName).subscribe();
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.modalService.open(error, { ariaLabelledBy: 'modal-basic-title' })
      }
      
    }, (reason) => { });
    this.deptName = null;
  }
  openNewTraining(training, error) {
    this.modalService.open(training, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.spinner.show();
      if(this.tRoomName!= null && this.tCapacity!= null && this.tFloor!= null && this.projector != null&& this.whiteBoard != null){
      this.http.createTrainingRoom(this.tRoomName, this.tCapacity, this.tFloor, this.projector, this.whiteBoard).subscribe();
      this.spinner.hide();
      }else{
        this.spinner.hide();
        this.modalService.open(error, { ariaLabelledBy: 'modal-basic-title' })
      }
    }, (reason) => { });
    this.tRoomName = null;
    this.tCapacity = null;
    this.tFloor = null;
    this.projector = null;
    this.whiteBoard = null;
  }
  openNewMeeting(meeting, error) {
    this.modalService.open(meeting, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.spinner.show();
      if(this.mRoomName!= null && this.mCapacity!= null && this.mFloor != null){
      this.http.createMeetingRoom(this.mRoomName, this.mCapacity, this.mFloor).subscribe();
      this.spinner.hide();
      }else{
        this.spinner.hide();
        this.modalService.open(error, { ariaLabelledBy: 'modal-basic-title' })
      }
    }, (reason) => { });
    this.mRoomName = null;
    this.mCapacity = null;
    this.mFloor = null;
  }
  yesWhiteBoard() {
    this.whiteBoard = true;
  }
  noWhiteBoard() {
    this.whiteBoard = false;
  }
  yesProjector() {
    this.projector = true;
  }
  noProjector() {
    this.projector = false;
  }


  approveMeeting(request) {
    this.spinner.show();
    this.http.approveMeeting(request).subscribe();
    this.router.navigateByUrl("/home", { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())])
    })
    this.spinner.hide();
  }
  denyMeeting(request) {
    this.spinner.show();
    this.http.denyMeeting(request).subscribe();
    this.router.navigateByUrl("/home", { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())])
    })
    this.spinner.hide();
  }
  approveTraining(request) {
    this.spinner.show();
    this.http.approveTraining(request).subscribe();
    this.router.navigateByUrl("/home", { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())])
    })
    this.spinner.hide();
  }
  denyTraining(request) {
    this.spinner.show();
    this.http.denyTraining(request).subscribe();
    this.router.navigateByUrl("/home", { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())])
    })
    this.spinner.hide();
  }
  approveLeave(request) {
    this.spinner.show();
    this.http.approveLeave(request).subscribe();
    this.router.navigateByUrl("/home", { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())])
    })
    this.spinner.hide();
  }
  denyLeave(request) {
    this.spinner.show();
    this.http.denyLeave(request).subscribe();
    this.router.navigateByUrl("/home", { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())])
    })
    this.spinner.hide();
  }

  selectEmpForTask(request) {
    this.empName = request.firstName + " " + request.lastName;
    this.empId = request.empId
    console.log(this.empId)

  }


}
