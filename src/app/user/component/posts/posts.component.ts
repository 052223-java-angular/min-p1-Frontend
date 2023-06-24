import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { Post } from 'src/app/models/Post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostPayload } from 'src/app/models/PostPayload';
import { take } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  formGroup: FormGroup;
  posts: Post[] | undefined;
  newPost: boolean = false;
  constructor(private fb: FormBuilder, private postService: PostService) {
    this.formGroup = fb.group({
      postTitle: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.postService.getPosts().pipe(take(1)).subscribe(res => {
      this.posts = res;
    });
  }

  submitPost() {
    if (this.formGroup.invalid) {
      return;
    }

    const payload: PostPayload = {
      postTitle: this.formGroup.controls['postTitle'].value,
      message: this.formGroup.controls['message'].value,
      userId: sessionStorage.getItem('id') || ''
    };

    this.postService.newPost(payload).pipe(take(1)).subscribe({
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

    this.newPost = false;
  }

  newPostClick() {
    this.newPost = true;
  }

}
