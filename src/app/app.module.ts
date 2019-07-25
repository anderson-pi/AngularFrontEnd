import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticateService } from './service/authenticate.service';
import { FormsModule, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from './home/tasks/tasks.component';
import { AuthenticationInterceptorService } from './service/authentication-interceptor.service';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { CreateLeaveRequestComponent } from './create-leave-request/create-leave-request.component';
import { MeetingRequestsComponent } from './meeting-requests/meeting-requests.component';
import { CreateMeetingRequestComponent } from './create-meeting-request/create-meeting-request.component';
import { TrainingRequestsComponent } from './training-requests/training-requests.component';
import { CreateTrainingRequestComponent } from './create-training-request/create-training-request.component';
import { ProfileComponent } from './profile/profile.component';
import { AvailableTrainingroomsComponent } from './create-training-request/available-trainingrooms/available-trainingrooms.component';
import { HttpClientService } from './service/http-client.service';
import { QuestionableBooleanPipe } from './models';
import { AvailableMeetingRoomComponent } from './create-meeting-request/available-meeting-room/available-meeting-room.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    TasksComponent,
    LeaveRequestsComponent,
    CreateLeaveRequestComponent,
    MeetingRequestsComponent,
    CreateMeetingRequestComponent,
    TrainingRequestsComponent,
    CreateTrainingRequestComponent,
    ProfileComponent,
    AvailableTrainingroomsComponent,
    QuestionableBooleanPipe,
    AvailableMeetingRoomComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    NgbModule,
    NgxSpinnerModule
    
  ],
  providers: [HttpClientService,AuthenticateService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptorService,
    multi: true
  },{ 
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => LoginComponent),
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
