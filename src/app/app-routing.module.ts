import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAlbumsComponent } from './components/user-albums/user-albums.component';

const routes: Routes = [
  {path: '', redirectTo:'users-list', pathMatch:'full'},
  {path: 'users-list', component: UsersListComponent},
  {path: 'user-albums/:id', component: UserAlbumsComponent},
  {path: 'user-posts/:id', component: UserPostsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
