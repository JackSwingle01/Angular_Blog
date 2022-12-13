import { JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUserPageComponent } from './about-user-page/about-user-page.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewUserComponent } from './new-user/new-user.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  //add routes here
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'posts',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'createPost',
    component: CreatePostComponent
  },
  {
    path: 'newUser',
    component: NewUserComponent
  },
  {
    path: 'editPost',
    component: EditPostComponent
  },
  {
    path: 'aboutUser',
    component: AboutUserPageComponent
  },
  {
    path: 'editUser',
    component: EditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
