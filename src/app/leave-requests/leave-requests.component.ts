import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { LeaveRequest } from '../models';
@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent implements OnInit {
leaveRequests:LeaveRequest;
  constructor(private http:HttpClientService) { }

  ngOnInit() {
    this.http.getLeaveRequest(parseInt(sessionStorage.getItem("id"))).subscribe(
      data => {
        this.leaveRequests =data;
    })
  }

}
