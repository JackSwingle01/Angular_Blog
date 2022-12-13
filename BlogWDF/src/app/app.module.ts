import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmailFieldComponent } from './email-field/email-field.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { NewUserComponent } from './new-user/new-user.component';
import { DeletePostButtonComponent } from './buttons/delete-post-button/delete-post-button.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { AboutUserPageComponent } from './about-user-page/about-user-page.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditUserComponent } from './edit-user/edit-user.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PostComponent,
    LoginComponent,
    EmailFieldComponent,
    CreatePostComponent,
    NewUserComponent,
    DeletePostButtonComponent,
    EditPostComponent,
    AboutUserPageComponent,
    EditUserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTooltipModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
