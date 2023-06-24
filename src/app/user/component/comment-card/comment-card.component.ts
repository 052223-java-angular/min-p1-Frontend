import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../service/post.service';
import { ModifyCommentPayload } from 'src/app/models/ModifyCommentPayload';
import { CommentVotePayload } from 'src/app/models/CommentVotePayload';
import { take } from 'rxjs';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent {
  @Input() comment: any;
  user: string = sessionStorage.getItem('username') || '';
  up: number = 0;
  down: number = 0;
  voted: boolean[] = [false, false];
  @Output("getPost") getPost: EventEmitter<any> = new EventEmitter();
  constructor(private postService: PostService, private dialog: MatDialog) {
  }



  modifyCommentClick() {
    const dialogRef = this.dialog.open(CommentFormComponent, {
      data: this.comment,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPost.emit();
    });
  }

  upvote() {
    const payload: CommentVotePayload = {
      vote: true,
      userId: sessionStorage.getItem('id') || '',
      commentId: this.comment.id
    };
    this.postService.voteComment(payload).pipe(take(1)).subscribe({
      next: ele => {

        if (this.voted[0] && this.voted[1]) {
          this.voted = [false, false]
          this.up--;
        } else {
          if (this.voted[0]) this.down--;
          this.up++;
          this.voted = [true, true]
        }
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
    this.postService.voteComment(payload).pipe(take(1)).subscribe({
      next: ele => {
        if (this.voted[0] && !this.voted[1]) {
          this.voted = [false, false]
          this.down--;
        } else {
          if (this.voted[0]) this.up--;
          this.down++;
          this.voted = [true, false]
        }
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

    this.comment.commentVotes.forEach((vote: { [x: string]: any; }) => {
      if (vote['username'] == sessionStorage.getItem('username')) {
        this.voted[0] = true;
        this.voted[1] = vote['vote'];
      }
    });
  }
}
