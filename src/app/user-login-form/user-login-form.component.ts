import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLoginRequest } from '../types';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData: UserLoginRequest = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        // Logic for a successful user registration goes here! (To be implemented)
        console.log(response);
        localStorage.setItem('user', response.Username);
        localStorage.setItem('token', response.token);
        this.dialogRef.close(); // This will close the modal on success!
        this.router.navigate(['movies']);

        this.snackBar.open('User login successful!', 'OK', {
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
