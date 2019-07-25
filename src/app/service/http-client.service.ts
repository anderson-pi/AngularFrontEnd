import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee, Tasks, TrainingRoom, traingRoomRequest, MeetingRoom, LeaveRequest, MeetingRequest, TrainingRequest, Department } from '../models';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { stringify } from 'querystring';

const baseUrl: string = "http://localhost:8082/emp";
const adminUrl: string = "http://localhost:8082/admin";

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
  public getAllMeetingingRooms(): Observable<MeetingRoom> {
    return this.httpClient.get<MeetingRoom>("http://localhost:8082/admin/viewMeetings");
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
    console.log(startTime,endTime)
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
  public getAllLeaveRequest():Observable<LeaveRequest>{
    return this.httpClient.get<LeaveRequest>(`${adminUrl}/viewLeaveRequest`)
  }
  public getAllTrainingRequest():Observable<TrainingRequest>{
    return this.httpClient.get<TrainingRequest>(`${adminUrl}/viewTrainingRequest`)
  }
  public getAllMeetingRequest():Observable<Array<MeetingRequest>>{
    return this.httpClient.get<Array<MeetingRequest>>(`${adminUrl}/viewMeetingRequest`)
  }
  public getAllEmps():Observable<Employee>{
    return this.httpClient.get<Employee>(`${adminUrl}/emps`)
  }
  public getAllDepts():Observable<Department>{
    return this.httpClient.get<Department>(`${adminUrl}/depts`)
  }
  public getEmpByLastName(name:string):Observable<Employee>{
    return this.httpClient.get<Employee>(`${adminUrl}/emps/${name}`)
  }
  public createTask(startDate,endDate,reason,name,empNb,admin):Observable<JSON>{
    let sDay = startDate["day"]
    let sMon = startDate["month"]
    let sYear = startDate["year"]
    let eDay = endDate["day"]
    let eMon = endDate["month"]
    let eYear = endDate["year"]
    sDay = this.appendZero(sDay)
    eDay =this.appendZero(eDay)
    sMon = this.appendZero(sMon)
    eMon = this.appendZero(eMon)
    let sDate = `${sYear}-${sMon}-${sDay}`
    let eDate = `${eYear}-${eMon}-${eDay}`
    console.log(eDate,sDate)
    return this.httpClient.post<JSON>(`${adminUrl}/task`,{"taskName":name,"taskDesc":reason,
    "startDate":sDate,"endDate":eDate,"assignedTo":empNb,"assignedBy":admin})
  }
  public creatEmployee(firstName,lastName,contactNo,dept):Observable<JSON>{
    return this.httpClient.post<JSON>(`${adminUrl}/emp/create/${dept}`,{"firstName":firstName, "lastName":lastName,"contactNo":contactNo})
  }
  public creatDepartment(dept:string):Observable<JSON>{
    console.log(dept)
    return this.httpClient.post<JSON>(`${adminUrl}/dept/create`,{"deptName":dept})
  }
  public createTrainingRoom(roomName,roomCapacity,floorNb,isProjector,isWhiteboard):Observable<JSON>{
    return this.httpClient.post<JSON>(`${adminUrl}/createTrainingRoom`,{"roomName":roomName,
    "roomCapacity":roomCapacity,"floorNb":floorNb,"projector":isProjector,"whiteboard":isWhiteboard})
  }
  public createMeetingRoom(meetingRoomName,capicity,floor):Observable<JSON>{
    return this.httpClient.post<JSON>(`${adminUrl}/createMeetingRoom`,{"meetingRoomName":meetingRoomName,
  "capicity":capicity, "floor":floor })
  }
  public approveMeeting(id):Observable<JSON>{
    return this.httpClient.put<JSON>(`${adminUrl}/acceptMeetingRoom/${id}`,null)
  }
  public denyMeeting(id):Observable<JSON>{
    return this.httpClient.delete<JSON>(`${adminUrl}/denyMeetingRoom/${id}`)
  }
  public approveTraining(id):Observable<JSON>{
    return this.httpClient.put<JSON>(`${adminUrl}/acceptTrainingRoom/${id}`,null)
  }
  public denyTraining(id):Observable<JSON>{
    return this.httpClient.delete<JSON>(`${adminUrl}/denyTrainingRoom/${id}`)
  }
  public approveLeave(id):Observable<JSON>{
    return this.httpClient.put<JSON>(`${adminUrl}/acceptLeave/${id}`,null)
  }
  public denyLeave(id):Observable<JSON>{
    return this.httpClient.delete<JSON>(`${adminUrl}/denyLeave/${id}`)
  }
  public deleteEmp(id):Observable<JSON>{
    return this.httpClient.delete<JSON>(`${adminUrl}/emp/${id}`)
  }
  public deleteDept(id):Observable<JSON>{
    return this.httpClient.delete<JSON>(`${adminUrl}/dept/${id}`)
  }
  public register(username,password,id):Observable<JSON>{
    return this.httpClient.post<JSON>(`http://localhost:8082/register/${id}`,
    {"userName":username,"passWord":password})
  }
 
  public getWeather():Observable<JSON>{
    return this.httpClient.get<JSON>('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?id=5180199&units=imperial&APPID=0e73510e45d52824506e93446d8ac054')
  }


  appendZero(text: number): string {
    if (text < 10) {
      return `0${text}`
    }
    else {
      return `${text}`;
    }
  }
  getDate(timeStamp:string){
    let dateTime =timeStamp.split(' ');
    return dateTime[0];
  }
  getStartTime(timeStamp:string){
    let dateTime =timeStamp.split(' ');
    return dateTime[1].substr(0,5);
  }
  getEndTime(timeStamp:string){
    let dateTime =timeStamp.split(' ');
    return dateTime[1].substr(0,5);
  }

}
