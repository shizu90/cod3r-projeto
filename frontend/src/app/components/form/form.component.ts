import { Component, OnInit } from '@angular/core'
import { FormService } from './form.service'
import { User } from './user.model'
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
  constructor(private formService: FormService, private router: Router) { }

  ngOnInit(): void {
  }

  changePage(page: string):void {
    this.page = page
    this.name = ''
    this.email = ''
    this.password = ''
    this.confirmPassword = ''
  }

  createUser(): void {
    const user: User = {name: this.name, email: this.email, password: this.password, confirmPassword: this.confirmPassword}
    this.name = ''
    this.password = ''
    this.confirmPassword = ''
    this.email = ''
    this.formService.createUser(user).subscribe(() => {
      this.formService.showMessage(`Usuário ${user.name} criado`, true)
      this.page = 'login'
    }, (err: HttpErrorResponse) => {this.formService.showMessage(`${err.error}`, false)})
  }

  login(): void {
    const user: User = {name: '', email: this.email, password: this.password, confirmPassword: ''}
    this.formService.login(user).subscribe((data) => {
      localStorage.setItem('session', JSON.stringify(data.body))
      if(data.status >= 200 && data.status < 400) this.formService.showMessage(`${data.body.name} logado com sucesso`, true)
      this.router.navigate(['/dashboard/home'])
    }, (err: HttpErrorResponse) => {this.formService.showMessage(`${err.error}`, false)}) 
  }

}
