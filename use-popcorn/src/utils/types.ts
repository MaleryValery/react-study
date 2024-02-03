export type MovieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export type WatchedMovieType = {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
  runtime: number;
  imdbRating: number;
  userRating?: number;
};
export type SearchResponse = {
  Response: string;
  Search: MovieType[];
  totalResults: string;
};

export type MovieDetails = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: RatingsType[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type RatingsType = {
  Source: string;
  Value: string;
};
