import React, { useState, useEffect } from "react";

import { quickAxios } from "../utils/axios";
import { useHistory } from "react-router-dom";

const initialValues = {
  title: "",
  director: "",
  metascore: "",
  stars: []
};
const AddMovieForm = ({ movies, setMovieList }) => {
  const [addMovie, setAddMovie] = useState(initialValues);

  const history = useHistory();

  const newMovie = () => {
    quickAxios()
      .post("movies", addMovie)
      .then((res) => {
        console.log(res);
        setMovieList(res.data);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleAddChange = (e) => {
    e.persist();
    let value = e.target.value;

    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    setAddMovie({
      ...addMovie,
      [e.target.name]: value
    });
  };

  const handleStar = (e) => {
    e.persist();
    console.log("handle star console.log: ", e);
    if (typeof addMovie.stars === "string") {
      const starArray = addMovie.stars.split(",");
      console.log("the star array", starArray);
      setAddMovie({
        ...addMovie,
        [e.target.name]: e.target.value,
        stars: starArray
      });
    }
  };

  return (
    <div>
      <h2>Add a Movie</h2>
      <form onSubmit={newMovie}>
        <input
          type="text"
          name="title"
          placeholder="Add Title"
          value={addMovie.title}
          onChange={handleAddChange}
        />
        <input
          type="text"
          name="director"
          placeholder="Add director"
          value={addMovie.director}
          onChange={handleAddChange}
        />
        <input
          type="number"
          name="metascore"
          placeholder="Add Metascore"
          value={addMovie.metascore}
          onChange={handleAddChange}
        />
        <input
          type="text"
          name="stars"
          placeholder="Add stars"
          value={addMovie.stars}
          onChange={handleStar}
        />
        );
        <button className="add-movie-btn">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
