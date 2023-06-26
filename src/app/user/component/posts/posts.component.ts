import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { Post } from 'src/app/models/Post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { PostFormComponent } from '../post-form/post-form.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/utility/component/popup/popup.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: Post[] | undefined;
  constructor(private postService: PostService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().pipe(take(1)).subscribe({
      next: res => {
        this.posts = res;
        this.posts.sort((a: any, b: any) => {
          return a['create_time'].localeCompare(b['create_time']);
        })
      },
      error: error => {
        console.log("failed");
        const dialogRef = this.dialog.open(PopupComponent, {
          data: error.error.message,
        });
      }
    });
  }


  newPostClick() {
    const dialogRef = this.dialog.open(PostFormComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPosts();
    });
  }

}
