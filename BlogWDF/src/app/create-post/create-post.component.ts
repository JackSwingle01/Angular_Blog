import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PostsService } from '../services/posts.service'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {


  title: string = '';
  content: string = '';
  headerImage: string = '';

  constructor(private postsInstance: PostsService, private router: Router) {
  }

  ngOnInit(): void {
  }
  MakePost() {
    this.postsInstance.addPost(this.title, this.content, this.headerImage);
    this.title = '';
    this.content = '';
    this.headerImage = '';
    this.router.navigateByUrl('/home');
  }
}
