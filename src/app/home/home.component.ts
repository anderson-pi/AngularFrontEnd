import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { Tasks } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  empName:string = "Hello"
  myTasks:Tasks[];
  id:number;
  constructor(private http:HttpClientService) {  this.id = +sessionStorage.getItem("id") }

  ngOnInit() {
    this.empName = sessionStorage.getItem("name");
    this.getTasks()     
  }
  ngOnChanges(){
  }
  getTasks(){
      this.http.getUsersTasks(this.id).subscribe(
      tasks => { this.myTasks =tasks})

  }

}
