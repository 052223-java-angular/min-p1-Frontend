import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  post!: Post;
  id!: string;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['postId'];
      this.postService.getPost(this.id).subscribe(res => {
        this.post = res;
        console.log(this.post);
      });

    });

  }

}
