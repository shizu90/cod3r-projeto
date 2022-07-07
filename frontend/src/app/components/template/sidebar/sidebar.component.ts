import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Category } from './categories.model';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private sidebarService: SidebarService) { }

  rawData = localStorage.getItem('session')
  sessionData = this.rawData ? JSON.parse(this.rawData) : null
  TREE_DATA: Category[] = [{name: '', id: 0, parentId: null, children: []}]
  nestedDataSource = new MatTreeNestedDataSource<Category>()
  nestedTreeControl = new NestedTreeControl<Category>(node => node.children)

  ngOnInit(): void {
    this.sidebarService.getTree(this.sessionData.token).subscribe((data) => this.TREE_DATA = data)
    this.nestedDataSource.data = this.TREE_DATA
  }

  hasNestedChild(index: number, node: Category) {
    return node.children?.length === undefined
  }

}
