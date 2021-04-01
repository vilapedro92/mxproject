import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiTypecodeService } from 'src/app/services/api-typecode.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit {

  id: any;
  commentList: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PostCommentsComponent>,
    private _apiTypecodeService: ApiTypecodeService,
    private snack: MatSnackBar,
  ) {
    this.id = data.id;
   }

  ngOnInit(): void {
    this.getPostCommentById()
  }

  getPostCommentById(): void {
    this._apiTypecodeService.getUserPostComments(this.id).subscribe(response => {
      let data: any = response as Comment;
      this.commentList = data;
    }, error => {
      console.log(error)
      this.snack.open(`${error.error.message}`, 'ERROR', { duration: 3000 });
    })
  }

}
