import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Post } from '../models/post'
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() CurrentPost: Post | undefined;

  @Output() PostDeleted = new EventEmitter<number>();
  @Output() PostEdited = new EventEmitter<number>();

  isEditing: boolean = false;

  currentUser: string | null = null;

  constructor() {

  }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('id');
  }

  DeletePost() {
    this.PostDeleted.emit(this.CurrentPost?.postId);
  }

  EditPost() {
    console.log("test");
    this.TogglePostEditor();
    this.PostEdited.emit(this.CurrentPost?.postId);

  }
  TogglePostEditor() {
    this.isEditing = !this.isEditing;

  }

}
