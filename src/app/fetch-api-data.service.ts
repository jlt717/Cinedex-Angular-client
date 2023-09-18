import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  UserLoginRequest,
  UserRegRequest,
  UserLoginResponse,
  Movie,
  UserEditResponse,
} from './types';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://cinedex.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  userRegistration(userDetails: UserRegRequest): Observable<string> {
    console.log(userDetails);
    return this.http
      .post<string>(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  //API call to user login endpoint
  userLogin(loginCred: UserLoginRequest): Observable<UserLoginResponse> {
    return this.http
      .post<UserLoginResponse>(`${apiUrl}/login`, loginCred)
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  //API call to specific user endpoint
  getUser(): Observable<UserLoginResponse> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .get<UserLoginResponse>(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  //API call to edit specific user endpoint
  editUser(updatedUser: any): Observable<UserEditResponse> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .put<UserEditResponse>(`${apiUrl}/users/${username}`, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }
  //  //API call to delete specific user endpoint
  getDeleteUser(): Observable<string> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .delete<string>(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }
  //API call to get all movies endpoint
  getAllMovies(): Observable<Movie[]> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Movie[]>(`${apiUrl}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //API call to get single movie endpoint
  getSingleMovie(title: string): Observable<Movie> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Movie>(`${apiUrl}/movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  //API call to add to favorite movies list endpoint
  //https://github.com/jlt717/movie_api/blob/main/index.js line 139 - 161
  addToFavorites(movieID: string): Observable<string> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .post<string>(`${apiUrl}/users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }
  //API call to remove movies from favorites list endpoint
  //https://github.com/jlt717/movie_api/blob/main/index.js line 165 - 185
  deleteFromFavorites(movieID: string): Observable<string> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .delete<string>(`${apiUrl}/users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }

  private extractResponseData<T>(res: T): T {
    return res;
  }

  private handleError() {
    return throwError(() => ({ message: 'error fetching data' }));
  }
}
