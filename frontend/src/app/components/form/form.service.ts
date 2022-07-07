import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from './user.model'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FormService {
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

  createUser(user: User): Observable<any> {
    return this.http.post<User>(`${this.baseUrl}/signup`, JSON.stringify(user), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    })
  }

  login(user: User): Observable<any> {
    return this.http.post<User>(`${this.baseUrl}/signin`, JSON.stringify({email: user.email, password: user.password}), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      observe: 'response'
    })
  }

}
