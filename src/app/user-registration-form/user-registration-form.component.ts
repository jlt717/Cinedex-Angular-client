import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegRequest } from '../types';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData: UserRegRequest = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: new Date(),
  };
  /**
   * Constructs the UserRegistrationFormComponent.
   * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the MatDialog for the registration form.
   * @param {MatSnackBar} snackBar - Angular Material service for displaying snackbar notifications.
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}
  /**
   * Lifecycle hook called after component initialization.
   */

  ngOnInit(): void {}

  /**
   * Sends user registration details to the backend.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        console.log(response);
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 2000,
        });
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
