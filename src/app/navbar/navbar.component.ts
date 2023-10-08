import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}
  /**
   * Checks if the user is currently logged in.
   * @returns {boolean} True if the user is logged in, false otherwise.
   */

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  /**
   * Logs out the user and navigates to the welcome screen.
   */
  logoutUser(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/welcome']);
  }
  /**
   * Navigates to the user profile screen.
   */
  navigateToProfile(): void {
    this.router.navigate(['/profile']); // Navigate to the user profile screen
  }
  /**
   * Navigates to the main view.
   */
  navigateToAllMovies(): void {
    this.router.navigate(['/movies']); // Navigate to the all movies screen
  }
}
