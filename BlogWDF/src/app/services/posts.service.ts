import { Injectable, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token } from '../models/token';
import { RouterOutlet } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnInit {

  postArray: Post[] = [];

  constructor(private httpClient: HttpClient) {
    let newPost = new Post(2, new Date(), "Test Title", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "testUserId", "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.tonyrogers.com%2Fnews%2Fimages%2Fspacenews%2Fearth_highres_lg.jpg&f=1&nofb=1&ipt=4a6921ad542cdaf1dcc20eb0026cd8d1282de112dc214717f77849ff639ecfb1&ipo=images", new Date());
    // this.postArray = this.getPosts();
    this.postArray.push(newPost);
  }

  ngOnInit() {
    // this.postArray = this.getPosts();
  }

  getPosts() {
    return this.httpClient.get<any[]>(`${environment.serverEndpoint}/posts`);
  }

  addPost(title: string, content: string, image: string) {
    // this.httpClient.post(`${environment.serverEndpoint}/posts`, testPost);
    let newPost = { title: title, content: content, headerImage: image };

    let header = this.CreateAuthHeader();

    this.httpClient.post(`${environment.serverEndpoint}/Posts`, newPost, { headers: header }).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Post Complete");
      }
    });
  }

  DeletePost(postId: number) {
    let header = this.CreateAuthHeader();
    this.httpClient.delete(`${environment.serverEndpoint}/Posts/${postId}`, { headers: header }).subscribe({
      next: (data) => {
        // console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Delete Complete");
      }
    });
  }
  EditPost(postId: number, title: string | undefined, content: string | undefined, image: string | undefined) {

    let editedPost = { title: title, content: content, headerImage: image };

    let header = this.CreateAuthHeader();
    this.httpClient.patch(`${environment.serverEndpoint}/Posts/${postId}`, editedPost, { headers: header }).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Edit Complete");
      }
    });
  }

  CreateAuthHeader() {
    let tokenString = localStorage.getItem("token");
    let header = new HttpHeaders();
    if (tokenString) {
      let tokenToken: Token = JSON.parse(tokenString) as Token;
      header = header.set('authorization', `Bearer ${tokenToken.token}`);
    }
    return header;
  }
}
