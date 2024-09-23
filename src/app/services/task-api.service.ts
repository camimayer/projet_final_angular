import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Task } from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  private apiUrl = 'https://monkfish-app-9x56s.ondigitalocean.app/v1/tasks';
  // private tasks: Task[] = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  getTasksCreatedByUsers(uid: string): Observable<any>{
    const headers = new HttpHeaders({
      'x-access-token': this.authService.getToken() || "",
    });
    return this.http.get(`${this.apiUrl}/createdby/${uid}`, { headers })
  }

  getTasksAssignedToUsers(uid: string): Observable<any>{
    const headers = new HttpHeaders({
      'x-access-token': this.authService.getToken() || "",
    });
    return this.http.get(`${this.apiUrl}/assignedto/${uid}`, { headers })
  }

  getTasksCreatedBy(token: string): Observable<any>{
    const headers = new HttpHeaders({
      'x-access-token': this.authService.getToken() || "",
    });
    return this.http.get(`${this.apiUrl}/createdby`, { headers })
  }

  getTasksAssignedTo(token: string): Observable<any>{
    const headers = new HttpHeaders({
      'x-access-token': this.authService.getToken() || "",
    });
    return this.http.get(`${this.apiUrl}/assignedto`, { headers })
  }

  updateTaskStatus(token: string, taskUid: string, done: boolean): Observable<any>{
    const headers = new HttpHeaders({
      'x-access-token': this.authService.getToken() || "",
    });
    const body = {done};

    return this.http.patch(`${this.apiUrl}/${taskUid}`, body, { headers });
  }

  deleteTask(token: string, taskUid: string): Observable<any>{
    const headers = new HttpHeaders({
      'x-access-token': this.authService.getToken() || "",
    });

    return this.http.delete(`${this.apiUrl}/${taskUid}`, { headers });
  }

  createTask(description: string, assignedToUid: string): Observable<any>{
    const headers = new HttpHeaders({
      'x-access-token': this.authService.getToken() || "",
    });
    const body = {
      description,
      assignedToUid
    };
    return this.http.post(this.apiUrl, body, {headers})
  }

  updateTask(taskUid: string, description: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': this.authService.getToken() || "",
    });
    // Atualiza o corpo para não aninhar dentro de `updatedTask`
    return this.http.patch(`${this.apiUrl}/${taskUid}`, description, { headers });
  }
 
}
