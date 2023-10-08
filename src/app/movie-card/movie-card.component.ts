/**
 * @fileOverview Angular component representing a movie card.
 * @module MovieCardComponent
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Movie, User } from '../types';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
/**
 * Angular component representing a movie card.
 *
 * @export
 * @class MovieCardComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  /**
   * Array containing movie data.
   *
   * @type {Movie[]}
   */
  movies: Movie[] = [];
  userFavorities: Movie[] = [];
  /**
   * Creates an instance of MovieCardComponent.
   *
   * @param {FetchApiDataService} fetchApiData - The data service for fetching movie data.
   * @param {MatDialog} dialog - The Angular Material dialog service.
   * @param {MatSnackBar} snackBar - The Angular Material snack bar service.
   * @param {Router} router - The Angular router service.
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}
  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    const user = localStorage.getItem('username');
    console.log('User from localStorage:', user);

    if (!user) {
      this.router.navigate(['welcome']);
      return;
    }

    this.getMovies();
    this.getUserFavorites();
  }
  /**
   * Fetches user's favorite movies from the API.
   */
  getUserFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: User) => {
      this.userFavorities = resp.FavoriteMovies;
    });
  }
  /**
   * Fetches all movies from the API.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: Movie[]) => {
      this.movies = resp;
    });
  }
  /**
   * Opens a dialog to display genre information.
   *
   * @param {string} genreName - The name of the genre.
   * @param {string} genreDescription - The description of the genre.
   */

  openGenreDialog(genreName: string, genreDescription: string): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '280px',
      data: { title: 'Genre', name: genreName, description: genreDescription },
    });
  }
  /**
   * Opens a dialog to display director information.
   *
   * @param {string} directorName - The name of the director.
   * @param {string} directorBio - The biography of the director.
   * @param {number} directorBirthyear - The birth year of the director.
   * @param {number} directorDeathyear - The death year of the director.
   */

  openDirectorDialog(
    directorName: string,
    directorBio: string,
    directorBirthyear: number,
    directorDeathyear: number
  ): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '280px',
      data: {
        title: 'Director',
        name: directorName,
        bio: directorBio,
        birthyear: directorBirthyear,
        deathyear: directorDeathyear,
      },
    });
  }
  /**
   * Opens a dialog to display movie description.
   *
   * @param {string} description - The description of the movie.
   */

  openDescriptionDialog(description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '280px',
      data: { title: 'Description', description: description },
    });
  }
  /**
   * Checks if a movie is in the user's favorites.
   *
   * @param {string} movieID - The ID of the movie.
   * @returns {boolean} - True if the movie is a favorite, false otherwise.
   */
  isFavorite(movieID: string): boolean {
    return !!this.userFavorities.find((movie) => movie._id === movieID);
  }
  /**
   * Adds a movie to the user's favorites.
   *
   * @param {string} movieID - The ID of the movie to add to favorites.
   */

  addToFavorites(movieID: string): void {
    this.fetchApiData.addToFavorites(movieID).subscribe({
      complete: () => {
        this.getMovies();
        this.getUserFavorites();
        this.snackBar.open('Movie has been added to favorites', 'OK', {
          duration: 2000,
        });
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open('Something went wrong', 'OK', {
          duration: 2000,
        });
      },
    });
  }
  /**
   * Deletes a movie from the user's favorites.
   *
   * @param {string} movieID - The ID of the movie to delete from favorites.
   */

  deleteFromFavorites(movieID: string): void {
    this.fetchApiData.deleteFromFavorites(movieID).subscribe({
      complete: () => {
        this.getMovies();
        this.getUserFavorites();
        this.snackBar.open('Movie has been deleted from favorites', 'OK', {
          duration: 2000,
        });
      },
      error: () => {
        this.snackBar.open('Something went wrong', 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
