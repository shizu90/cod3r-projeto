import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  raw = localStorage.getItem('session')
  data = this.raw ? JSON.parse(this.raw) : null

  TREE_DATA: any = null
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    console.log(this.data.token)
    this.http.get('http://localhost:3000/categories/tree', {
      headers: new HttpHeaders().set('Authorization', this.data ? `bearer ${this.data.token}` : ''),
      observe: 'response'
    }).subscribe((data) => {console.log(data)})
  }

}
