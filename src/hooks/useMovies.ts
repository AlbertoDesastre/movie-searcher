import { useState, useRef } from "react";
import { getMovies } from "../services/getMovies";

export type Movie = {
  id: string;
  title: string;
  year: string;
  type: string;
  poster: string;
};

function useMovies({ search }: { search: string }) {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const searchRef = useRef(search);

  const searchMovies = async ({ search }: { search: string }) => {
    if (searchRef.current === search) return;
    try {
      searchRef.current = search;
      setLoading(true);
      const mappedMovies = await getMovies({ search });
      setMovies(mappedMovies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, searchMovies };
}

export { useMovies };
