import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Movie } from '../types';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: Movie[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (!user) {
      this.router.navigate(['welcome']);
      return;
    }

    this.getMovies();
  }

  getMovies(): void {
    const token = localStorage.getItem('token');
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
  openGenreDialog(genreName: string, genreDescription: string): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '280px',
      data: { title: 'Genre', name: genreName, description: genreDescription },
    });
  }
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
  openDescriptionDialog(description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '280px',
      data: { title: 'Description', description: description },
    });
  }

  isFavorite(movieID: string): boolean {
    return this.fetchApiData.isFavoriteMovie(movieID);
  }
  addFavorite(movieID: string): void {
    //const userID = localStorage.getItem('username');
    this.fetchApiData.addToFavorites(movieID).subscribe(
      () => {
        this.snackBar.open('Movie has been added to favorites', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        this.snackBar.open('Something went wrong', 'OK', {
          duration: 2000,
        });
      }
    );
  }
  deleteFavorite(movieID: string): void {
    //const userID = localStorage.getItem('username');
    this.fetchApiData.deleteFromFavorites(movieID).subscribe(
      () => {
        this.snackBar.open('Movie has been deleted from favorites', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        this.snackBar.open('Something went wrong', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
