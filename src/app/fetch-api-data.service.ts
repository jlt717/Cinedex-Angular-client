import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://cinedex.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {}
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
  //API call to user login endpoint
  getUserLogin(): Observable<{ Username: string; Password: string }> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //API call to specific user endpoint
  getUser(Username: string): Observable<{ Username: string }> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users' + Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //API call to edit specific user endpoint
  getEditUser(Username: string): Observable<{
    Username: string;
    Password: string;
    Birthday: Date;
    Email: string;
    FavoriteMovies: [];
  }> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users' + Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //API call to delete specific user endpoint
  getDeleteUser(Username: any): Observable<{ Username: string }> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users' + Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //API call to get all movies endpoint
  getAllMovies(): Observable<{ title: string }> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
  //API call to get single movie endpoint
  getSingleMovie(title: string): Observable<{ title: string }> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //API call to get single director endpoint
  getSingleDirector(
    directorName: string
  ): Observable<{ directorName: string }> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //API call to get single genre endpoint
  getSingleGenre(genreName: string): Observable<{ genreName: string }> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //API call to get favorite movies from user
  getFavoriteMovies(
    Username: string,
    MovieID: string
  ): Observable<{ Username: string; MovieID: string; FavoriteMovies: [] }> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users' + Username + 'movies/' + MovieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //API call to add to favorite movies list endpoint
  getAddToFavorites(
    Username: string,
    MovieID: string
  ): Observable<{ Username: string; MovieID: string; FavoriteMovies: [] }> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users' + Username + 'movies/' + MovieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //API call to remove movies from favorites list endpoint
  getDeleteFromFavorites(
    Username: string,
    MovieID: string
  ): Observable<{ Username: string; MovieID: string; FavoriteMovies: [] }> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users' + Username + 'movies/' + MovieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor() {}
}
