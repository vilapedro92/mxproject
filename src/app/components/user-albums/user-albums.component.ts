import { Album } from './../../models/album';
import { Component, OnInit } from '@angular/core';
import { ApiTypecodeService } from 'src/app/services/api-typecode.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA: Album[] = [];

@Component({
  selector: 'app-user-albums',
  templateUrl: './user-albums.component.html',
  styleUrls: ['./user-albums.component.scss']
})
export class UserAlbumsComponent implements OnInit {

  displayedColumns: string[] = ['title'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  search: boolean = false;
  _id: string = null;

  constructor(
    private _apiTypecodeService: ApiTypecodeService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe(param => {
      let tempParam: any = param;
      if (tempParam.params.id) {
        this._id = tempParam.params.id;
      }
    })
  }

  ngOnInit(): void {
    if (this._id)
      this.getUserAlbums()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUserAlbums(id?: string): void {
    this.search = true;
    this._apiTypecodeService.getUserAlbums(id || this._id).subscribe(response => {
      let data: any = response as Album;
      this.dataSource.data = [...data];
      this.search = false;
    }, error => {
      console.log(error)
      this.search = false;
      this.snack.open(`${error.error.message}`, 'ERROR', { duration: 3000 });
    })
  }

}
