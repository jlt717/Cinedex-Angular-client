import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Movie } from '../types';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // return this.movies;
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
      data: { title: 'Description', content: description },
    });
  }
}
