import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input() post!: Post;
  constructor(private router: Router) { };
  postClick() {
    this.router.navigate([`/post/${this.post.id}`])
  }
}
