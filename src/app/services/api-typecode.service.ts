import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { User } from './../models/users';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiTypecodeService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<any> {
    return this.http.get(environment.baseUrl + environment.endpoints.users);
  }

  getUserAlbums(id: string): Observable<any> {
    return this.http.get(environment.baseUrl + environment.endpoints.user + `/${id}/` + environment.endpoints.albums)
  }

  getUserPosts(id: string): Observable<any> {
    return this.http.get(environment.baseUrl + environment.endpoints.user + `/${id}/` + environment.endpoints.posts)
  }

  getUserPostComments(id: string): Observable<any> {
    return this.http.get(environment.baseUrl + environment.endpoints.posts + `/${id}/` + environment.endpoints.comments)
  }
}
