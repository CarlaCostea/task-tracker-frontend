import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'https://task-tracker-backend-k3xg.onrender.com/tasks';

  constructor(private http: HttpClient) {}

  getTasks(searchTitle: string = '', completed: boolean = false): Observable<Task[]> {
    let url = `${this.apiUrl}?title=${searchTitle}&completed=${completed}`;
    return this.http.get<Task[]>(url);
  }

  // getTaskById(id: number): Observable<Task> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.get<Task>(url);
  // }  

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskStatus(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }
}
