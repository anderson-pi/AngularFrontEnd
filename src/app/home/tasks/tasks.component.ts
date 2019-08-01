import { Component, OnInit, Input } from '@angular/core';
import { Tasks } from 'src/app/models';
import { HttpClientService } from 'src/app/service/http-client.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
@Input('myTasks') tasks:Tasks[];
  constructor(private spinner:NgxSpinnerService,private http:HttpClientService) { }
taskID:number;
taskName:string ;
taskCompleted:boolean;
taskDesc:string;
currentClick:Tasks;
hintColor;

  ngOnInit() {
  }

 displayItem(task:Tasks){
  this.hintColor = "#deb887";
    this.currentClick = task
    this.taskCompleted = task.status
    this.taskID = task.taskId;
    this.taskName = task.taskName;
    this.taskDesc = task.taskDesc
  }

  markComplete(task:Tasks){
    console.log(this.currentClick)
    this.spinner.show();
    this.http.markTaskComplete(this.currentClick.taskId).subscribe(
      data => {
        this.spinner.hide();
        this.currentClick.status =true;
        this.taskCompleted = true;
        this.hintColor = "#008000";
        this.taskName = "Competed";
        this.taskDesc = data["returnText"];
        
      }, error =>{
        this.spinner.hide();
      }
    )
    
  }
    
}
