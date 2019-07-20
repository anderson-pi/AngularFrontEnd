import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { CreateLeaveRequestComponent } from './create-leave-request/create-leave-request.component';
import { MeetingRequestsComponent } from './meeting-requests/meeting-requests.component';
import { CreateMeetingRequestComponent } from './create-meeting-request/create-meeting-request.component';
import { TrainingRequestsComponent } from './training-requests/training-requests.component';
import { CreateTrainingRequestComponent } from './create-training-request/create-training-request.component';
import { ProfileComponent } from './profile/profile.component';
import { AvailableMeetingRoomComponent } from './create-meeting-request/available-meeting-room/available-meeting-room.component';


const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"home", component:HomeComponent},
  {path:"admin", component:ProfileComponent},
  {path:"leave", component:LeaveRequestsComponent},
  {path:"leaveRequest", component:CreateLeaveRequestComponent},
  {path:"meeting", component:MeetingRequestsComponent},
  {path:"meetingRequest", component:CreateMeetingRequestComponent},
  {path:"training", component:TrainingRequestsComponent},
  {path:"trainingRequest", component:CreateTrainingRequestComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
