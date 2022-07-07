import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  baseUrl='http://localhost:3000'

  constructor(private http: HttpClient) { }

  getTree(token: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/categories/tree`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`)
    })
  }
}
