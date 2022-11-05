import { NotfountpageComponent } from './notFoundpage/notfountpage.component'

import { AuthenticationGuard } from './authentication.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  {path:'' , redirectTo:'movies',pathMatch:'full'},
  {path: 'register', component:RegisterComponent},
  {path:'login' ,component:LoginComponent},
  {path:'movies' ,canActivate:[AuthenticationGuard] ,component:MoviesComponent},
  {path:'**',component:NotfountpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
