import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { quickAxios } from "../utils/axios";

function MovieList({ movies, setMovieList }) {
  const getMovieList = () => {
    quickAxios()
      .get("movies")
      .then((res) => setMovieList(res.data));
  };
  useEffect(() => {
    getMovieList();
  }, [movies]);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <Link key={movie.id} to={`/movies/${movie.id}`}>
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
}

export default MovieList;
