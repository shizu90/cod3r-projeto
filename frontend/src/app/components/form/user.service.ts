import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { UserModel } from './user.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl="http://localhost:3000"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, status: boolean): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: status ? ['snack-bar-success'] : ['snack-bar-error']
    })
  }

  createUser(user: UserModel): Observable<any> {
    return this.http.post<UserModel>(`${this.baseUrl}/signup`, JSON.stringify(user), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    })
  }

  login(user: UserModel): Observable<any> {
    return this.http.post<UserModel>(`${this.baseUrl}/signin`, JSON.stringify({email: user.email, password: user.password}), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    })
  }

}
