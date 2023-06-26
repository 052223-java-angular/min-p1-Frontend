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
  up: number = 0;
  down: number = 0;
  constructor(private router: Router) { };
  postClick() {
    this.router.navigate([`/post/${this.post.id}`])
  }

  ngOnInit() {
    this.up = this.post.votes.filter((vote: { [x: string]: any; }) => vote['vote']).length;
    this.down = this.post.votes.length - this.up;
  }
}
