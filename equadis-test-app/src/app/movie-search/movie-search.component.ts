import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent {
  searchQuery: string = '';
  movies: any[] = [];

  constructor(private movieService: MovieService) {}

  searchMovies() {
    if (this.searchQuery.trim() === '') {
      // Handle empty search query
      this.movies = [];
      return;
    }

    this.movieService.searchMovies(this.searchQuery).subscribe((data: any) => {
      this.movies = data.results;
    });
  }
}
