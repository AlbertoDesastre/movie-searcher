import { Movie } from "../hooks/useMovies";

const API_KEY = import.meta.env.VITE_API_SECRET;

type ApiResponse = {
  Search: Array<{
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }>;
  totalResults: string;
  Response: string;
};

async function getMovies({ search }: { search: string }) {
  if (search === "") return [];

  return await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    .then((res) => {
      return res.json();
    })
    .then((response: ApiResponse) => {
      const mappedMovies: Movie[] = response.Search?.map((movie) => {
        return {
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          type: movie.Type,
          poster: movie.Poster,
        };
      });

      return mappedMovies;
    })
    .catch(() => {
      throw new Error("Error while trying to get movies.");
    });
}

export { getMovies };
