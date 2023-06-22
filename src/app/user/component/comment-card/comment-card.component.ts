import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../service/post.service';
import { ModifyCommentPayload } from 'src/app/models/ModifyCommentPayload';
import { CommentPayload } from 'src/app/models/CommentPayload';
import { CommentVotePayload } from 'src/app/models/CommentVotePayload';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent {
  @Input() comment: any;
  modifyCommentC: boolean = false;
  user: string = sessionStorage.getItem('username') || '';
  up: number = 0;
  down: number = 0;

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

  upvote() {
    const payload: CommentVotePayload = {
      vote: true,
      userId: sessionStorage.getItem('id') || '',
      commentId: this.comment.id
    };
    this.postService.voteComment(payload).subscribe({
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
  }

  downvote() {
    const payload: CommentVotePayload = {
      vote: false,
      userId: sessionStorage.getItem('id') || '',
      commentId: this.comment.id
    };
    this.postService.voteComment(payload).subscribe({
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
  }

  ngOnInit() {
    this.up = this.comment.commentVotes.filter((vote: { [x: string]: any; }) => vote['vote']).length;
    this.down = this.comment.commentVotes.length - this.up;
  }
}
