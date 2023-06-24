import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/models/CommentPayload';
import { PostService } from '../../service/post.service';
import { take } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
  formGroup: FormGroup;
  payload: CommentPayload = {
    comment: '',
    userId: sessionStorage.getItem('id') || '',
    postId: '',
    commentId: ''
  };

  constructor(private fb: FormBuilder, private postService: PostService, public dialogRef: MatDialogRef<PostComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.comments) {
      this.payload.postId = data.id;
    }

    if (data.comment) {
      this.payload.commentId = data.id;
    }
    this.formGroup = fb.group({
      comment: ['', [Validators.required]],
    });


  }
  submitComment() {
    if (this.formGroup.invalid) {
      return;
    }


    this.postService.newComment(this.payload).pipe(take(1)).subscribe({
      next: comment => {
        this.dialogRef.close();
        console.log("success");
        // Handle the sucsess response
        // TODO: Add code for handling success response
      },
      error: error => {
        console.log("failed");
        // Handle the error response
        // TODO: Add code for handling error response
      }
    })

  }

  editComment() {
    if (this.formGroup.invalid) {
      return;
    }


    this.postService.modifyComment(this.payload).pipe(take(1)).subscribe({
      next: comment => {
        this.dialogRef.close();
        console.log("success");
        // Handle the sucsess response
        // TODO: Add code for handling success response
      },
      error: error => {
        console.log("failed");
        // Handle the error response
        // TODO: Add code for handling error response
      }
    })
  }
}
