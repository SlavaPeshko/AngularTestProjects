import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from "../user.service";
import { User } from "./user.model";
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['position', 'name', 'email', 'phone', 'website', 'action'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => this.dataSource = new MatTableDataSource(users));
    console.log('ngOnInit', this.sort);
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit', this.sort);
    this.dataSource.sort = this.sort;
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.dataSource = new MatTableDataSource(users));
  }

  trackByFunction(item) {
    return item.id;
  }
}
