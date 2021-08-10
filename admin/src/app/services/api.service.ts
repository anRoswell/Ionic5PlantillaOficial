import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
const { server, api } = environment;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  all(path: string): Observable<any> {
    return this.http.get<any>(`${server}${api}/${path}`);
  }

  create(path: string, data: any): Observable<any> {
    return this.http.post<any>(`${server}${api}/${path}`, data);
  }

  update(path: string, data: any): Observable<any> {
    return this.http.put<any>(`${server}${api}/${path}`, data);
  }

  delete(path: string): Observable<any> {
    return this.http.delete<any>(`${server}${api}/${path}`);
  }

  ById(path: string): Observable<any> {
    return this.http.get<any>(`${server}${api}/${path}`);
  }
}
