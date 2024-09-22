import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskApiService } from '../services/task-api.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TaskAPI } from '../models/task-api.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  userForm: FormGroup;
  users: any[] = [];
  createdTasks: TaskAPI[] = [];
  assignedTasks: TaskAPI[] = [];

  constructor(
    private fb: FormBuilder,
    private taskApiService: TaskApiService,
    private userService: UserService,
    private router: Router,
  ){
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
}

