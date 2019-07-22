import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { MeetingRequest } from '../models';

@Component({
  selector: 'app-meeting-requests',
  templateUrl: './meeting-requests.component.html',
  styleUrls: ['./meeting-requests.component.css']
})
export class MeetingRequestsComponent implements OnInit {
  meetingRequest:MeetingRequest[];
  constructor(private http:HttpClientService) { }

  ngOnInit() {
    this.http.getMeetingRequest(parseInt(sessionStorage.getItem("id"))).subscribe(
      data =>{
        data.forEach(element => {
          element.day = this.http.getDate(element.startTime);
          element.startTime = this.http.getStartTime(element.startTime);
          element.endTime = this.http.getEndTime(element.endTime);
  
        });
        this.meetingRequest = data;
    })
  }
  

}
