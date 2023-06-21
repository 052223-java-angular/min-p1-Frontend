import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../service/post.service';
import { ModifyCommentPayload } from 'src/app/models/ModifyCommentPayload';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent {
  @Input() comment: any;
  modifyCommentC: boolean = false;

  formGroup: FormGroup;
  constructor(private fb: FormBuilder, private postService: PostService) {
    this.formGroup = fb.group({
      comment: ['', [Validators.required]],
    });

  }

  modifyComment() {
    if (this.formGroup.invalid) {
      return;
    }

    const payload: ModifyCommentPayload = {
      comment: this.formGroup.controls['comment'].value,
      userId: sessionStorage.getItem('id') || '',
      commentId: this.comment.id
    };

    this.postService.modifyComment(payload).subscribe({
      next: comment => {
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

    this.modifyCommentC = false;
  }

  modifyCommentClick() {
    this.modifyCommentC = true;
  }
}
