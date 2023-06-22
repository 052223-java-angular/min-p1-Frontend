import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/models/CommentPayload';
import { ModifyPostPayload } from 'src/app/models/ModifyPostPayload';
import { PostVotePayload } from 'src/app/models/PostVotePayload';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  formGroup: FormGroup;
  formGroupB: FormGroup;

  post!: Post;
  id!: string;
  newComment: boolean = false;
  modifyPost: boolean = false;
  user: string = sessionStorage.getItem('username') || '';
  up: number = 0;
  down: number = 0;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private postService: PostService) {
    this.formGroup = fb.group({
      comment: ['', [Validators.required]],
    });

    this.formGroupB = fb.group({
      postTitle: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['postId'];
      this.postService.getPost(this.id).subscribe(res => {
        this.post = res;
        this.up = this.post.votes.filter(vote => vote['vote']).length;
        this.down = this.post.votes.length - this.up;
      });

    });

  }

  submitComment() {
    if (this.formGroup.invalid) {
      return;
    }

    const payload: CommentPayload = {
      comment: this.formGroup.controls['comment'].value,
      userId: sessionStorage.getItem('id') || '',
      postId: this.id
    };

    this.postService.newComment(payload).subscribe({
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

    this.newComment = false;
  }

  ModifyPost() {
    if (this.formGroupB.invalid) {
      return;
    }

    const payload: ModifyPostPayload = {
      message: this.formGroupB.controls['message'].value,
      postTitle: this.formGroupB.controls['postTitle'].value,
      userId: sessionStorage.getItem('id') || '',
      postId: this.id
    };
    console.log("here");
    this.postService.modifyPost(payload).subscribe({
      next: post => {
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

    this.modifyPost = false;
  }

  modifyPostClick() {
    this.modifyPost = true;
  }

  newCommentClick() {
    this.newComment = true;
  }

  upvote() {
    const payload: PostVotePayload = {
      vote: true,
      userId: sessionStorage.getItem('id') || '',
      postId: this.post.id
    };
    this.postService.votePost(payload).subscribe({
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
    const payload: PostVotePayload = {
      vote: false,
      userId: sessionStorage.getItem('id') || '',
      postId: this.post.id
    };
    this.postService.votePost(payload).subscribe({
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

}
