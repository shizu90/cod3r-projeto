import { Component, OnInit } from '@angular/core'
import { UserService } from './user.service'
import { UserModel } from './user.model'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  name: string = ''
  email: string = ''
  password: string = ''
  confirmPassword: string = ''
  hide = false
  page = 'login'

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  createUser(): void {
    const user: UserModel = {name: this.name, email: this.email, password: this.password, confirmPassword: this.confirmPassword}
    this.name = ''
    this.password = ''
    this.confirmPassword = ''
    this.email = ''
    this.userService.createUser(user).subscribe(() => {
      this.userService.showMessage(`Usuário ${user.name} criado`, true)
      this.page = 'login'
    }, (err: HttpErrorResponse) => {this.userService.showMessage(`${err.error}`, false)})
  }

  login(): void {
    const user: UserModel = {name: '', email: this.email, password: this.password, confirmPassword: ''}
    this.userService.login(user).subscribe((data) => {
      localStorage.setItem('session', JSON.stringify(data.body))
      if(data.status >= 200 && data.status < 400) this.userService.showMessage(`${data.body.name} logado com sucesso`, true)
      this.router.navigate(['/home'])
    }, (err: HttpErrorResponse) => {this.userService.showMessage(`${err.error}`, false)}) 
  }
}
