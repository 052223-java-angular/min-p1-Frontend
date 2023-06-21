import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: Post[] | undefined;
  constructor(private postService: PostService) {

  }

  ngOnInit() {
    this.postService.getPosts().subscribe(res => {
      this.posts = res;
    });
  }

}
