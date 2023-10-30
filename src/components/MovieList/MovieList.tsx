import { Movie } from "../../hooks/useMovies";

function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <ul className="movie-list">
      {movies.map((movie) => {
        return (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title}></img>
          </li>
        );
      })}
    </ul>
  );
}

export default MovieList;
