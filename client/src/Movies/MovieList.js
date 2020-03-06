import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import { quickAxios } from "../utils/axios";

function MovieList({ movies, setMovieList }) {
  // const history = useHistory();

  const getMovieList = () => {
    quickAxios()
      .get("movies")
      .then((res) => setMovieList(res.data));
  };
  useEffect(() => {
    getMovieList();
  }, []);

  // const clickHandle = () => {
  //   history.push("/add-movie");
  // };

  return (
    <div>
      <Link to="/add-movie">Add a Movie</Link>
      {/* <button onClick={clickHandle}>Add a Movie</button> */}
      <div className="movie-list">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
