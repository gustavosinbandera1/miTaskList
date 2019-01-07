import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _url: any = 'http://localhost:8080/api/tasks';
  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(this._url);
  }
}
