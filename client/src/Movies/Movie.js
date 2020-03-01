import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import { quickAxios } from "../utils/axios";

function Movie(props) {
  console.log("props from movie component", props);
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const { id } = useParams();
  const history = useHistory();

  const deletedMovie = props.movieList.find((item) => `${item.id}` === id);

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const handleDelete = () => {
    quickAxios()
      .delete(`movies/${deletedMovie.id}`)
      .then((res) => {
        // console.log(res);
        const newArray = props.movieList.filter(
          (item) => item.id !== deletedMovie.id
        );
        props.setMovieList(newArray);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };
  const clickHandler = (e) => {
    e.preventDefault();
    history.push(`/update-movie/${id}`);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button className="update-btn" onClick={clickHandler}>
        Update
      </button>
      <button className="delete-btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
