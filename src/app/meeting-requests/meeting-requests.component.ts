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
          element.day = this.getDate(element.startTime);
          element.startTime = this.getStartTime(element.startTime);
          element.endTime = this.getEndTime(element.endTime);
  
        });
        this.meetingRequest = data;
    })
  }

  getDate(timeStamp:string){
    let dateTime =timeStamp.split('T');
    return dateTime[0];
  }
  getStartTime(timeStamp:string){
    let dateTime =timeStamp.split('T');
    return dateTime[1].substr(0,5);
  }
  getEndTime(timeStamp:string){
    let dateTime =timeStamp.split('T');
    return dateTime[1].substr(0,5);
  }
  
  

}
