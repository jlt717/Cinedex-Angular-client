import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, Movie, UserLoginResponse } from '../types';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  user: User = {
    _id: '',
    Username: '',
    Password: '',
    Email: '',
    Birthday: new Date(),
    FavoriteMovies: [],
  };
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  favoriteMovies: Movie[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}
  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    this.fetchApiData.getUser().subscribe((user: User) => {
      this.user = user;
      this.favoriteMovies = user.FavoriteMovies;
    });
  }
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      this.user = response;
      this.snackBar.open('User has been updated!', 'OK', {
        duration: 2000,
      });
    });
  }
  isFavorite(movieID: string): boolean {
    return !!this.favoriteMovies.find((movie) => movie._id === movieID);
  }
  deleteFromFavorites(movieID: string): void {
    this.fetchApiData.deleteFromFavorites(movieID).subscribe({
      complete: () => {
        this.isFavorite(movieID);
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
  deleteAccount(): void {
    // Send a request to your API to delete the user's account
    this.fetchApiData.getDeleteUser().subscribe({
      error: (error) => {
        console.error('Account deletion error:', error);
        this.snackBar.open(
          'Failed to delete account. Please try again.',
          'OK',
          {
            duration: 2000,
          }
        );
      },
      complete: () => {
        this.snackBar.open('Account deleted successfully.', 'OK', {
          duration: 2000,
        });

        // Clear local storage and navigate to the login screen
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/welcome']);
      },
    });
  }
}
