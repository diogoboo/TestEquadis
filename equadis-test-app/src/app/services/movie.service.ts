import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzk4ZTA5YjM2OGJlMDczMzA5YTMyNTVjZTRlNDRjYiIsInN1YiI6IjY1MjUyMGI1ODNlZTY3MDBlNDM4YmNiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pkK9Ka5BO5zzZMZaqIOZ0rnIHMw4Iw5VjuPWL87sZ04'; 

  private baseUrl = 'https://api.themoviedb.org/3';
  private imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private http: HttpClient,
              @Inject(SESSION_STORAGE) private storage: StorageService
        ) {}

  searchMovies(query: string): Observable<any> {
    const cachedData = this.storage.get(`search-${query}`);

    if (cachedData) {
      return of(cachedData);
    }

    const url = `${this.baseUrl}/search/movie`;
    const params = new HttpParams()
      .set('query', query)
      .set('include_adult', 'false')
      .set('language', 'en-US')
      .set('page', '1');

    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    return this.http.get(url, { headers, params }).pipe(
            map((response: any) => {
        this.storage.set(`search-${query}`, response);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getMovieDetails(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}`;
    const params = new HttpParams().set('language', 'en-US');

    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    return this.http.get(url, { headers, params }).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return of(['Error message: Review request']); 
  }
}
