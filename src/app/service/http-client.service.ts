import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee, Tasks, TrainingRoom, traingRoomRequest, MeetingRoom, LeaveRequest, MeetingRequest, TrainingRequest } from '../models';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { stringify } from 'querystring';

const baseUrl: string = "http://localhost:8082/emp";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) { }

  public findUserIdByLogin(username: string): Observable<Employee> {

    return this.httpClient.get<Employee>(`${baseUrl}/findUsersId/${username}`);
  }
  public getUsersTasks(empId: number): Observable<Array<Tasks>> {
    return this.httpClient.get<Array<Tasks>>(`${baseUrl}/getTasks/${empId}`);
  }
  public markTaskComplete(taskId: number): Observable<JSON> {
    return this.httpClient.put<JSON>(`${baseUrl}/taskComplete`, taskId);
  }
  public getAllTrainingRooms(): Observable<Set<TrainingRoom>> {
    return this.httpClient.get<Set<TrainingRoom>>("http://localhost:8082/admin/viewTrainings");
  }
  public sendTrainingRooms(id: number, form: FormGroup, roomID: number): Observable<any> {
    let sDay = form.controls.startDate.value["day"]
    let sMon = form.controls.startDate.value["month"]
    let sYear = form.controls.startDate.value["year"]
    let eDay = form.controls.endDate.value["day"]
    let eMon = form.controls.endDate.value["month"]
    let eYear = form.controls.endDate.value["year"]
    sDay = this.appendZero(sDay)
    eDay =this.appendZero(eDay)
    sMon = this.appendZero(sMon)
    eMon = this.appendZero(eMon)
    let startDate = `${sYear}-${sMon}-${sDay}`
    let endDate = `${eYear}-${eMon}-${eDay}`
    return this.httpClient.post<JSON>(`${baseUrl}/trainingRoom/${id}`, {
      "trainingRoomId": roomID, "startDate": startDate,
      "endDate": endDate, "roomDesc": form.controls.reason.value
    });
  }

  public sendLeaveRequest(form:FormGroup, id:number): Observable<JSON> {
    let sDay = form.controls.startDate.value["day"]
    let sMon = form.controls.startDate.value["month"]
    let sYear = form.controls.startDate.value["year"]
    let eDay = form.controls.endDate.value["day"]
    let eMon = form.controls.endDate.value["month"]
    let eYear = form.controls.endDate.value["year"]
    sDay = this.appendZero(sDay)
    eDay =this.appendZero(eDay)
    sMon = this.appendZero(sMon)
    eMon = this.appendZero(eMon)
    let startDate = `${sYear}-${sMon}-${sDay}`
    let endDate = `${eYear}-${eMon}-${eDay}`

    return this.httpClient.post<JSON>(`${baseUrl}/leaveRequest/${id}`, {"leaveType": form.controls.type.value,
    "startDate": startDate, "endDate": endDate, "reason": form.controls.reason.value});
  }
  public getAllMeetingingRooms(): Observable<Set<MeetingRoom>> {
    return this.httpClient.get<Set<MeetingRoom>>("http://localhost:8082/admin/viewMeetings");
  }
  
  public sendMeetingRooms(id: number, form: FormGroup, roomID: number): Observable<any> {
    let sDay = form.controls.startDate.value["day"]
    let sMon = form.controls.startDate.value["month"]
    let sYear = form.controls.startDate.value["year"]
    sDay = this.appendZero(sDay)
    sMon = this.appendZero(sMon)
    let startDate = `${sYear}-${sMon}-${sDay}`

    let sSec = form.controls.startTime.value["second"];
    let sMin = form.controls.startTime.value["minute"];
    let sHr = form.controls.startTime.value["hour"];
    let eSec = form.controls.endTime.value["second"];
    let eMin = form.controls.endTime.value["minute"];
    let eHr = form.controls.endTime.value["hour"];
    sSec = this.appendZero(sSec);
    sMin = this.appendZero(sMin);
    sHr = this.appendZero(sHr);
    eSec = this.appendZero(eSec);
    eMin= this.appendZero(eMin);
    eHr = this.appendZero(eHr);
    let startTime = `${sHr}:${sMin}:${sSec}`
    let endTime = `${eHr}:${eMin}:${eSec}`
  
    return this.httpClient.post<JSON>(`${baseUrl}/meetingRoom/${id}`, {
      "roomId": roomID, "day": startDate,
      "startTime": startTime, "endTime": endTime,"meetingDesc": form.controls.reason.value
    });
  }

  public getLeaveRequest(id:number):Observable<LeaveRequest>{
    return this.httpClient.get<LeaveRequest>(`${baseUrl}/viewLeaveRequests/${id}`)
  }
  public getMeetingRequest(id:number):Observable<Array<MeetingRequest>>{
    return this.httpClient.get<Array<MeetingRequest>>(`${baseUrl}/viewMeetingRequests/${id}`)
  }
  public getTrainingRequest(id:number):Observable<TrainingRequest>{
    return this.httpClient.get<TrainingRequest>(`${baseUrl}/viewTrainingRequests/${id}`)
  }
  public getUserRole(user:string):Observable<JSON>{
    return this.httpClient.get<JSON>(`${baseUrl}/findUsersRole/${user}`)
  }


  appendZero(text: number): string {
    if (text < 10) {
      return `0${text}`
    }
    else {
      return `${text}`;
    }
  }

}
