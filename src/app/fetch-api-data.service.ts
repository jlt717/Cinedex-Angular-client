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
  UserFavoriteMoviesResponse,
} from './types';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://cinedex.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
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
    const username = localStorage.getItem('user');
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
    const username = localStorage.getItem('user');
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
    localStorage.removeItem('token');
    return this.http
      .delete<string>(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(this.extractResponseData, catchError(this.handleError));
  }
  getFavoriteMovies(): Observable<Movie[]> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get<UserFavoriteMoviesResponse>(`${apiUrl}/users/${username}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map((response: UserFavoriteMoviesResponse) => response.FavoriteMovies),
        catchError(this.handleError)
      );
  }
  isFavoriteMovie(movieID: string): boolean {
    const userStr = localStorage.getItem('username');

    //Check if userStr is null or undefined
    if (!userStr || userStr === 'undefined') {
      return false;
    }

    const user = JSON.parse(userStr);
    if (user) {
      return user.FavoriteMovies.includes(movieID);
    }

    return false;
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
  deleteFromFavorites(movieID: string): Observable<string> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    localStorage.setItem('user', JSON.stringify(username));
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
