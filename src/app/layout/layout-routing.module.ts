import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../core/guards/authentication.guard';
import { MoviesComponent } from './components/movies/movies.component';

const routes: Routes = [
  {
    path: 'movies',
    canActivate: [AuthenticationGuard],
    component: MoviesComponent,
  },
  {path:'**' , redirectTo:'/movies',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
