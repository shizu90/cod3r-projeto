import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  goesToHome():void{
    if(this.sessionData) {
      this.router.navigate(['/dashboard/home'])
    }else{
      this.router.navigate(['/'])
    }
  }

  goesToAdmin():void {
    this.router.navigate(['/dashboard/admin'])
  }

  logout():void {
    localStorage.clear()
    this.router.navigate(['/'])
  }
}
