import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  rawData = localStorage.getItem('session')
  sessionData = this.rawData ? JSON.parse(this.rawData) : null

  constructor() { }

  ngOnInit(): void {
  }

}
