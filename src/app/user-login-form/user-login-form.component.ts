import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLoginRequest } from '../types';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData: UserLoginRequest = { Username: '', Password: '' };
  /**
   * Constructs the UserLoginFormComponent.
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API.
   * @param {Router} router - Angular router service for navigation.
   * @param {MatSnackBar} snackBar - Angular Material service for displaying snackbar notifications.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Reference to the MatDialog for the login form.
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserLoginFormComponent>
  ) {}
  /**
   * Lifecycle hook called after component initialization.
   */

  ngOnInit(): void {}
  /**
   * Logs in the user using the provided credentials and navigates to the movies screen after successful login.
   */
  loginUser(): void {
    console.log('Logging in with user data:', this.userData);
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        console.log('Login response:', response);
        localStorage.setItem('username', response.user.Username);
        localStorage.setItem('token', response.token);
        this.router.navigate(['movies']);

        this.snackBar.open('User login successful!', 'OK', {
          duration: 2000,
        });
        this.dialogRef.close();
      },

      (error) => {
        console.error('Login error:', error);
        this.snackBar.open(
          'User login failed. Please check login credentials.',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    );
  }
}
