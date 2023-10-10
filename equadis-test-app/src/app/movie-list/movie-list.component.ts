import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the search query from the route parameters
    this.route.queryParams.subscribe(params => {
      const searchQuery = params['query'];
      if (searchQuery) {
        // Call the movie service to fetch search results
        this.movieService.searchMovies(searchQuery).subscribe((data: any) => {
          this.movies = data.results;
        });
      }
    });
  }

  getImageUrl(posterPath: string): string {
    return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'assets/no-image.png';
  }
}
