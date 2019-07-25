import { Component, OnInit, Input } from '@angular/core';
import { MeetingRequestsComponent } from 'src/app/meeting-requests/meeting-requests.component';
import { MeetingRoom } from 'src/app/models';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-available-meeting-room',
  templateUrl: './available-meeting-room.component.html',
  styleUrls: ['./available-meeting-room.component.css']
})
export class AvailableMeetingRoomComponent implements OnInit {
  @Input() meetingForm;
  meetingRooms:MeetingRoom
  choosenRoom:MeetingRoom;

  constructor(private spinner: NgxSpinnerService,private http:HttpClientService, private router:Router) { }

  ngOnInit() {
    this.http.getAllMeetingingRooms().subscribe(
      data => {
        this.meetingRooms = data;
        
    })
  }

  getRoom(room:MeetingRoom){
    this.choosenRoom = room;
  }

  markComplete(){
    this.spinner.show()
    this.http.sendMeetingRooms(parseInt(sessionStorage.getItem("id")), this.meetingForm, this.choosenRoom.roomId).subscribe(
      data => {
        this.spinner.hide()
        this.router.navigate(['/home'])
      }
    )
  }
}
