import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: any = {};

  constructor(private movieService: MovieService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the movie ID from the route parameters
    this.route.params.subscribe(params => {
      const movieId = +params['id'];
      if (movieId) {
        // Call the movie service to fetch movie details
        this.movieService.getMovieDetails(movieId).subscribe((data: any) => {
          this.movie = data;
        });
      }
    });
  }

  getImageUrl(posterPath: string): string {
    return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'assets/no-image.png';
  }
}
