import { PostCommentsComponent } from './../post-comments/post-comments.component';
import { Post } from './../../models/post';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiTypecodeService } from 'src/app/services/api-typecode.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

const ELEMENT_DATA: Post[] = [];

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {

  displayedColumns: string[] = ['title', 'body', 'options'];
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
      this.getUserPost()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUserPost(id?: string): void {
    this.search = true;
    this._apiTypecodeService.getUserPosts(id || this._id).subscribe(response => {
      let data: any = response as Post;
      this.dataSource.data = [...data];
      this.search = false;
    }, error => {
      console.log(error)
      this.search = false;
      this.snack.open(`${error.error.message}`, 'ERROR', { duration: 3000 });
    })
  }

  comments(id: string): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(PostCommentsComponent, {
      width: '820px',
      disableClose: true,
      data: { id: id }
    });
    // this.search = true;
    // dialogRef.afterClosed()
    //   .subscribe(res => {
    //     if (!res) {
    //       this.search = false;
    //       return;
    //     }
    //     this._apiService.addGateWay(res)
    //       .subscribe(response => {
    //         this.search = false;
    //         this.getAllGateWays()
    //       }, error => {
    //         console.log(error);
    //         this.snack.open(error.error.message, 'ERROR', { duration: 4000 });
    //       });
    //   });

  }

}
