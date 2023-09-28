import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}
  logout(): void {
    console.log('Logout button clicked');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/welcome']);
  }
  navigateToProfile(): void {
    this.router.navigate(['/profile']); // Navigate to the user profile screen
  }
  navigateToAllMovies(): void {
    this.router.navigate(['/movies']); // Navigate to the all movies screen
  }
}
