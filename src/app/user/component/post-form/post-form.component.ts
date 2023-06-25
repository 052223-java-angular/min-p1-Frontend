import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../service/post.service';
import { PostPayload } from 'src/app/models/PostPayload';
import { take } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostsComponent } from '../posts/posts.component';
import { PopupComponent } from 'src/app/utility/component/popup/popup.component';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  formGroup: FormGroup;
  payload: PostPayload = {
    postTitle: '',
    message: '',
    userId: sessionStorage.getItem('id') || '',
    postId: ''
  };
  @Output("getPosts") getPosts: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder, private postService: PostService, public dialogRef: MatDialogRef<PostsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
    if (data) {
      this.payload.postTitle = data.postTitle
      this.payload.message = data.message
      this.payload.postId = data.id
    }
    this.formGroup = fb.group({
      postTitle: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  submitPost() {
    if (this.formGroup.invalid) {
      return;
    }

    this.postService.newPost(this.payload).pipe(take(1)).subscribe({
      next: post => {
        this.dialogRef.close();
        console.log("success");
        // Handle the sucsess response
        // TODO: Add code for handling success response
      },
      error: error => {
        console.log("failed");
        const dialogRef = this.dialog.open(PopupComponent, {
          data: error.error.message,
        });;
        // Handle the error response
        // TODO: Add code for handling error response
      }
    })

  }

  editPost() {
    if (this.formGroup.invalid) {
      return;
    }

    this.postService.modifyPost(this.payload).pipe(take(1)).subscribe({
      next: post => {
        this.dialogRef.close();
        console.log("success");
        // Handle the sucsess response
        // TODO: Add code for handling success response
      },
      error: error => {
        console.log("failed");
        const dialogRef = this.dialog.open(PopupComponent, {
          data: error.error.message,
        });;
        // Handle the error response
        // TODO: Add code for handling error response
      }
    })

  }
}
