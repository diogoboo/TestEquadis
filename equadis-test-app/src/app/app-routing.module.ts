import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieSearchComponent } from './movie-search/movie-search.component'; // Replace 'SearchComponent' with your actual search component
import { MovieDetailsComponent } from './movie-details/movie-details.component'; // Replace 'MovieDetailsComponent' with your actual movie details component
import { MovieListComponent } from './movie-list/movie-list.component';
const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: MovieSearchComponent }, 
  { path: 'movie/:id', component: MovieDetailsComponent }, 
  { path: 'movie-list', component: MovieListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
