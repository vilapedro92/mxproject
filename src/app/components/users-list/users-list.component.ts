import { ApiTypecodeService } from './../../services/api-typecode.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from './../../models/users'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'username', 'phone', 'options'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  search:boolean = false;

  constructor(
    private _apiTypecodeService: ApiTypecodeService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUsers():void {
    this.search = true;
    this._apiTypecodeService.getUsers().subscribe(response => {
      let data:any = response as User;
      this.dataSource.data = [...data];
      this.search = false;
    }, error => {
      console.log(error)
      this.search = false;
      this.snack.open(`${error.error.message}`, 'ERROR', { duration: 3000 });
    })
  }

  albums(id: string): void {
    this.router.navigate([`/user-albums/${id}`])
  }

  posts(id: string): void {
    this.router.navigate([`/user-posts/${id}`])
  }

}
