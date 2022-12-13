import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-delete-post-button',
  templateUrl: './delete-post-button.component.html',
  styleUrls: ['./delete-post-button.component.css']
})
export class DeletePostButtonComponent {

  @Input() postId: number | undefined;
  @Output() PostDeleted = new EventEmitter();

  constructor(private postService: PostsService, private router: Router) { }

  Delete() {
    if (this.postId) {
      this.postService.DeletePost(this.postId);
      this.PostDeleted.emit();
    }
  }
}
