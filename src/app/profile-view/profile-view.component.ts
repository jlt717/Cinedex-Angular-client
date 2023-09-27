import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserLoginResponse, Movie } from '../types';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  user!: UserLoginResponse;
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  favoriteMovies: Movie[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}
  ngOnInit(): void {
    this.getUser;
  }
  getUser(): void {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    this.fetchApiData.getUser().subscribe((user: UserLoginResponse) => {
      this.user;
    });
  }
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      localStorage.setItem('user', response.Username);
      localStorage.setItem('token', response.token);
      this.user = response;
      this.snackBar.open('User has been updated!', 'OK', {
        duration: 2000,
      });
    });
  }
  getFavoriteMovies(): void {
    const username = localStorage.getItem('username');
    this.fetchApiData.getFavoriteMovies().subscribe((movies: Movie[]) => {
      this.favoriteMovies = movies;
    });
  }
  deleteAccount(): void {
    // Send a request to your API to delete the user's account
    this.fetchApiData.getDeleteUser().subscribe(
      () => {
        // Account deletion successful
        this.snackBar.open('Account deleted successfully.', 'OK', {
          duration: 2000,
        });

        // Clear local storage and navigate to the login screen
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Account deletion error:', error);
        this.snackBar.open(
          'Failed to delete account. Please try again.',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    );
  }
}
