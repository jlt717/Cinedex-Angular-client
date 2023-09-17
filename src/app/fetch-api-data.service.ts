import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://cinedex.herokuapp.com/';
type userReg = {
  Username: string;
  Password: string;
  Email: string;
  Birthday: Date;
};
type userResponse = { message: string };
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {}
  // Making the api call for the user registration endpoint

  userRegistration(userDetails: userReg): Observable<userResponse> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
  //API call to user login endpoint
  getUserLogin(
    email: string,
    password: string
  ): Observable<{
    _id: string;
    Birthday: Date;
    Email: string;
    FavoriteMovies: string[];
    Username: string;
  }> {
    const token = localStorage.getItem('token');
    const loginCred = {
      email: email,
      password: password,
    };
    return this.http
      .post(apiUrl + 'login', loginCred, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //API call to specific user endpoint
  getUser(Username: string): Observable<{
    _id: string;
    Birthday: Date;
    Email: string;
    FavoriteMovies: string[];
    Username: string;
  }> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //API call to edit specific user endpoint
  getEditUser(
    Username: string,
    updatedUser: any
  ): Observable<{
    _id: string;
    Birthday: Date;
    Email: string;
    FavoriteMovies: string[];
    Username: string;
  }> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/' + Username, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //API call to delete specific user endpoint
  getDeleteUser(Username: string): Observable<{
    _id: string;
    Birthday: Date;
    Email: string;
    FavoriteMovies: string[];
    Username: string;
  }> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //API call to get all movies endpoint
  getAllMovies(): Observable<{
    _id: string;
    Birthday: Date;
    Email: string;
    FavoriteMovies: string[];
    Username: string;
  }> {
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
  getSingleMovie(title: string): Observable<{
    Title: string;
    Released: string;
    Description: string;
    Genre: {
      Name: string;
      Description: string;
    };
    Director: {
      Name: string;
      Bio: string;
      Birth: string;
      Death: string;
    };
    ImagePath: string;
    Featured: boolean;
  }> {
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
  getSingleDirector(directorName: string): Observable<{
    Director: {
      Name: String;
      Bio: String;
      Birth: String;
      Death: String;
    };
  }> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //API call to get single genre endpoint
  getSingleGenre(genreName: string): Observable<{
    Genre: {
      Name: String;
      Description: String;
    };
  }> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName, {
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
  ): Observable<{
    _id: string;
    Birthday: Date;
    Email: string;
    FavoriteMovies: string[];
    Username: string;
  }> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + Username + '/movies/' + MovieID, {
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
  ): Observable<userResponse> {
    const token = localStorage.getItem('token');
    return this.http
      .post(apiUrl + 'users/' + Username + '/movies/' + MovieID, {
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
  ): Observable<userResponse> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + Username + '/movies/' + MovieID, {
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
