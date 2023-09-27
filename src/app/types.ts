export interface UserLoginRequest {
  Username: string;
  Password: string;
}

export interface UserRegRequest extends UserLoginRequest {
  Email: string;
  Birthday: Date;
}

export interface UserLoginResponse extends UserRegRequest {
  token: string;
  _id: string;
  FavoriteMovies: Movie[];
}

export interface UserEditResponse extends UserRegRequest {
  token: string;
  _id: string;
  FavoriteMovies: Movie[];
}
export interface UserFavoriteMoviesResponse {
  FavoriteMovies: Movie[];
}
export interface Movie {
  _id: string;
  Description: string;
  Director: {
    Name: string;
    Bio: string;
    Birthyear: number;
    Deathyear: number;
  };
  Featured: boolean;
  Genre: {
    Name: string;
    Description: string;
  };
  ImageURL: string;
  Released: string;
  Title: string;
}
