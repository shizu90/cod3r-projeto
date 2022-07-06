import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  rawData = localStorage.getItem('session') 
  sessionData = this.rawData ? JSON.parse(this.rawData) : null

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
