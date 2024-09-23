import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskApiService } from '../services/task-api.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TaskAPI } from '../models/task-api.model';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  userForm: FormGroup;
  users: any[] = [];

  isMobile: boolean;
  showCreatedBy: boolean;
  showAssignedTo: boolean;

  createdTasks: TaskAPI[] = [];
  assignedTasks: TaskAPI[] = [];
  private token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlbmFuQGdtYWlsLmNvbSIsImlkIjoiNjZjM2VmZmU3ZTA0MWU4Y2MzNGEyZWU4IiwiZXhwIjoxNzI3MDM2NDA5fQ.NAiFM6MfLNHUxJQZQmtX60k8o_CBYf4kCCcRRxwC0NU";

  constructor(
    private fb: FormBuilder,
    private taskApiService: TaskApiService,
    private userService: UserService,
    private router: Router,
  ){
    this.isMobile = Capacitor.isNativePlatform();
    this.showCreatedBy = true;
    this.showAssignedTo = false;
    this.userForm = this.fb.group({
      uid: ["", Validators.required]
    });

    this.loadUsers();
  }

  loadUsers(){
    this.userService.getAllUsers().subscribe(
      (res)=>{
        this.users = res.allUsers;
      }
    );
  }
 
  getTask(){
    if(this.userForm.valid){
      const {uid} = this.userForm.value;
      this.taskApiService.getTasksCreatedByUsers(uid).subscribe(
        (res) => {
          this.createdTasks = res.allTasks;
          console.log(this.createdTasks)
        }
      );
  
      this.taskApiService.getTasksAssignedToUsers(uid).subscribe(
        (res) => {
          this.assignedTasks = res.allTasks;
          console.log(this.assignedTasks)
        }
      );

    }
    else{
      console.error("Form is Invalid!")
    }
  }
  // changeTask(task: TaskAPI){
  //   this.router.navigate(["/edit-task", task.taskUid]);
  // }

  changeTask(task: TaskAPI) {
    this.router.navigate(["/edit-task", task.taskUid], { queryParams: { description: task.description } });
  }

  deleteTask(task: TaskAPI){
    this.taskApiService.deleteTask(this.token, task.taskUid).subscribe(
      ()=>{
        this.getTask();
      }
    );
  }
  fetchTasks(){
    this.taskApiService.getTasksCreatedBy(this.token).subscribe(
      (res) => {
        this.createdTasks = res.allTasks;
      }
    );

    this.taskApiService.getTasksAssignedTo(this.token).subscribe(
      (res) => {
        this.assignedTasks = res.allTasks;
        console.log(this.assignedTasks)
      }
    );
  }
  shouldShowCreatedBy(){
    this.showCreatedBy = true;
    this.showAssignedTo = false;
  }
  shouldShowAssingedTo(){
    this.showCreatedBy = false;
    this.showAssignedTo = true;
  }
}

