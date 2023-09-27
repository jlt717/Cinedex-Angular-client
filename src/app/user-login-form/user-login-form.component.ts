import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
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
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  loginUser(): void {
    console.log('Logging in with user data:', this.userData);
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        console.log('Login response:', response);
        //localStorage.setItem('user', response.Username);
        localStorage.setItem('user', JSON.stringify(response.Username));
        localStorage.setItem('token', response.token);
        this.router.navigate(['movies']);

        this.snackBar.open('User login successful!', 'OK', {
          duration: 2000,
        });
      },

      (error) => {
        console.error('Login error:', error);
        this.snackBar.open('Login failed', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
