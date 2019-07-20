import { PipeTransform, Pipe } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

export class Employee {
    empId: number;
    firstName: string;
    lastName: string;
    userLogin: any;
}

export class traingRoomRequest {
    trainingRoomId: number;
    startDate: any;
    endDate: any;
    roomDesc: string;
}


export class UserLogin {
    userName: string;
    passWord: string;
}
export class Tasks {
    taskId: number;
    taskName: string;
    taskDesc: string;
    startDate;
    endDate;
    assignedTo;
    assignedBy;
    status: boolean;
}

export class TrainingRoom {
    roomId: number;
    roomName: string;
    roomCapacity: number;
    floorNb: number;
    isProjector: boolean;
    isWhiteboard: boolean;
    reservedDates: Set<NgbDateStruct>;
}
export class MeetingRoom {
    roomId: number;
    meetingRoomName: string;
    capicity: number;
    floor: number;
    reservedDates: Map<NgbDateStruct, Set<NgbTimeStruct>>;
}
export class LeaveRequest {
    leaveId: number;
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: boolean;
}
export class MeetingRequest {
    requestId: number;
    MeetingRoomId: number;
    day: string = ""
    startTime: string;
    endTime: string;
    meetingDesc: string;
    status: boolean;
}
export class TrainingRequest {
    requestId:number;
    trainingRoomId:number;
    startDate:string;
    endDate:string;
    roomDesc:string;
    status:boolean;
}
@Pipe({ name: 'questionableBoolean' })
export class QuestionableBooleanPipe implements PipeTransform {
    transform(value: boolean): string {
        return value == true ? 'Yes' : 'No'
    };
}