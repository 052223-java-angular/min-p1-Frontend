import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/models/CommentPayload';
import { PostVotePayload } from 'src/app/models/PostVotePayload';
import { take } from 'rxjs';
import { PostPayload } from 'src/app/models/PostPayload';
import { PostFormComponent } from '../post-form/post-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {


  post!: Post;
  id!: string;
  newComment: boolean = false;
  modifyPost: boolean = false;
  user: string = sessionStorage.getItem('username') || '';
  up: number = 0;
  down: number = 0;
  voted: boolean | undefined;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private postService: PostService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.getPost();

  }

  getPost() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['postId'];
      this.postService.getPost(this.id).pipe(take(1)).subscribe(res => {
        this.post = res;
        this.up = this.post.votes.filter(vote => vote['vote']).length;
        this.down = this.post.votes.length - this.up;
        for (let vote of this.post.votes) {
          if (vote['username'] == sessionStorage.getItem('username')) {
            this.voted = vote['vote'];
            break
          }
        }
      });

    });
  }


  modifyPostClick() {
    const dialogRef = this.dialog.open(PostFormComponent, {
      data: this.post,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPost();
    });
  }

  newCommentClick() {
    const dialogRef = this.dialog.open(CommentFormComponent, {
      data: this.post,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPost();
    });
  }

  upvote() {
    const payload: PostVotePayload = {
      vote: true,
      userId: sessionStorage.getItem('id') || '',
      postId: this.post.id
    };
    this.postService.votePost(payload).pipe(take(1)).subscribe({
      next: ele => {
        if (this.voted) {
          this.voted = undefined
          this.up--;
        } else {
          if (this.voted) this.down--;
          this.up++;
          this.voted = true
        }
        console.log("success");
        // Handle the sucsess response
        // TODO: Add code for handling success response
      },
      error: ele => {
        console.log("failed");
        // Handle the error response
        // TODO: Add code for handling error response
      }
    })
  }

  downvote() {
    const payload: PostVotePayload = {
      vote: false,
      userId: sessionStorage.getItem('id') || '',
      postId: this.post.id
    };
    this.postService.votePost(payload).pipe(take(1)).subscribe({
      next: ele => {
        if (this.voted == false) {
          this.voted = undefined
          this.down--;
        } else {
          if (this.voted) this.up--;
          this.down++;
          this.voted = false
        }

        console.log("success");
        // Handle the sucsess response
        // TODO: Add code for handling success response
      },
      error: ele => {
        console.log("failed");
        // Handle the error response
        // TODO: Add code for handling error response
      }
    })
  }

}
