import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postArray: Post[] = [];
  constructor(private postsInstance: PostsService, private titleSvc: Title) {
    // console.log("test construtor");
    this.titleSvc.setTitle('Home Page');
    // this.postArray = this.postsInstance.getPosts();

  }

  ngOnInit(): void {
    // this.postArray = this.postsInstance.getPosts();
    this.postsInstance.getPosts().subscribe({
      next: data => this.postArray = data,
      error: err => console.log(err)
    });
  }
  RemovePost(postId: number) {
    this.postArray.splice(this.postArray.findIndex(p => p.postId == postId), 1);
  }
  EditPost(postId: number){
    this.ngOnInit();
  }

}
