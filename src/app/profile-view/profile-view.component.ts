import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, Movie } from '../types';
import { formatDate } from '@angular/common';

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
    Birthday: '',
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
  /**
   * Fetches user data from the API
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((user: User) => {
      this.user = {
        ...user,
        Birthday: formatDate(user.Birthday, 'MM-dd-yyyy', 'en-US'),
      };
      this.userData = {
        Username: user.Username,
        Password: '',
        Email: user.Email,
        Birthday: formatDate(user.Birthday, 'MM-dd-yyyy', 'en-US'),
      };
      this.favoriteMovies = user.FavoriteMovies;
    });
  }
  /**
   * Updates user profile based on the provided input.
   */
  editUser(): void {
    const birthdayEpoch = Date.parse(this.userData.Birthday);
    const editedUser = {
      Username: this.userData.Username || this.user.Username,
      Password: this.userData.Password,
      Email: this.userData.Email || this.user.Email,
      Birthday: birthdayEpoch || this.user.Birthday,
    };

    this.fetchApiData.editUser(editedUser).subscribe((response) => {
      this.user = response;
      this.getUser();
      this.snackBar.open('User has been updated!', 'OK', {
        duration: 2000,
      });
    });
  }
  /**
   * Checks if a movie with the given ID is in the user's favorites.
   * @param {string} movieID - The ID of the movie to check.
   * @returns {boolean} True if the movie is a favorite, false otherwise.
   */

  isFavorite(movieID: string): boolean {
    return !!this.favoriteMovies.find((movie) => movie._id === movieID);
  }
  /**
   * Deletes a movie from the user's favorites list.
   * Displays a snackbar notification upon successful deletion.
   * @param {string} movieID - The ID of the movie to delete from favorites.
   */

  deleteFromFavorites(movieID: string): void {
    this.fetchApiData.deleteFromFavorites(movieID).subscribe({
      complete: () => {
        this.fetchApiData.getUser().subscribe((user: User) => {
          this.user = user;
          this.favoriteMovies = user.FavoriteMovies;
          this.snackBar.open('Movie has been deleted from favorites', 'OK', {
            duration: 2000,
          });
        });
      },
      error: () => {
        this.snackBar.open('Something went wrong', 'OK', {
          duration: 2000,
        });
      },
    });
  }
  /**
   * Deletes user's account.
   * Navigates to welcome screen after account deletion.
   */
  deleteAccount(): void {
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
        localStorage.clear();
        this.router.navigate(['/welcome']);
      },
    });
  }
}
