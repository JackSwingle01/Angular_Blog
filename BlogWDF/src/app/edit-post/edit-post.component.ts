import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {

  @Output() PostEdited = new EventEmitter;
  @Input() currentPost: Post | undefined;

  content: string | undefined;
  headerImage: string | undefined;
  title: string | undefined;


  constructor(private postService: PostsService, private router: Router) {
    this.content = this.currentPost?.content;
    this.title = this.currentPost?.content;
    this.headerImage = this.currentPost?.content;
  }

  ngOnInit(): void {

  }

  Edit() {
    if (this.currentPost) {
      this.postService.EditPost(this.currentPost.postId, this.title, this.content, this.headerImage);
      this.PostEdited.emit();
    }
  }

}
