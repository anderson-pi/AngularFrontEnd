import { Component, OnInit, Input } from '@angular/core';
import { traingRoomRequest, TrainingRoom } from 'src/app/models';
import { FormGroup, FormBuilder,  } from '@angular/forms';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-available-trainingrooms',
  templateUrl: './available-trainingrooms.component.html',
  styleUrls: ['./available-trainingrooms.component.css']
})
export class AvailableTrainingroomsComponent implements OnInit {

 
  trainingRooms: Set<TrainingRoom>;
  @Input() trainingForm: FormGroup;
  chosenRoom:TrainingRoom;
  trainingRequest:traingRoomRequest;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClientService) { }

  ngOnInit() {
    this.http.getAllTrainingRooms().subscribe(
      rooms => {
        this.trainingRooms = rooms;
      }
    )

  }
  
  markComplete(){
    if(this.chosenRoom != null){
      this.http.sendTrainingRooms(parseInt(sessionStorage.getItem("id")),this.trainingForm,this.chosenRoom.roomId).subscribe(
        data =>{
            this.router.navigate(['/home'])
        }
      )
    }
  }
  getRoom(room:TrainingRoom){
    this.chosenRoom = room;
  }

}
