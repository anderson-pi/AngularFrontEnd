import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { TrainingRequest } from '../models';

@Component({
  selector: 'app-training-requests',
  templateUrl: './training-requests.component.html',
  styleUrls: ['./training-requests.component.css']
})
export class TrainingRequestsComponent implements OnInit {
traingingRequests:TrainingRequest;
  constructor(private http:HttpClientService) { }

  ngOnInit() {
    this.http.getTrainingRequest(parseInt(sessionStorage.getItem("id"))).subscribe(
      data => {
        this.traingingRequests = data;
    })
  }

}
