import "./App.scss";
import MovieList from "./components/MovieList/MovieList";
import { useMovies } from "./hooks/useMovies";
import { useState, useCallback } from "react";
import debounce from "just-debounce-it";

function App() {
  const [search, setSearch] = useState("");
  const { movies, loading, searchMovies } = useMovies({ search });

  const debounceSearchMovies = useCallback(
    debounce((search: string) => searchMovies({ search }), 300),
    []
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    searchMovies({ search });
  };

  const handleChange = (event: React.FormEvent) => {
    const newSearch = (event.target as HTMLInputElement).value;

    setSearch(newSearch);

    debounceSearchMovies(newSearch);
  };

  return (
    <div className="app-container">
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Spiderman, Hulk, Superman..."
          ></input>
          <button type="submit">Search</button>
        </form>
        {loading ? <p>Loading...</p> : null}
      </header>

      <main>
        {movies ? (
          <MovieList movies={movies} />
        ) : (
          <p>Search your favourite movies!</p>
        )}
      </main>
    </div>
  );
}

export default App;
