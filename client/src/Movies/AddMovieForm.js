import React, { useState, useEffect } from "react";

import { quickAxios } from "../utils/axios";
import { useHistory, Redirect } from "react-router-dom";

const initialValues = {
  id: null,
  title: "",
  director: "",
  metascore: "",
  stars: []
};
const AddMovieForm = ({ setMovieList }) => {
  const [addMovie, setAddMovie] = useState(initialValues);

  const history = useHistory();

  const newMovie = () => {
    quickAxios()
      .post("movies", addMovie)
      .then((res) => {
        console.log("post new movies response: ", res);
        addStars();
      })
      .catch((err) => console.log(err));
  };

  // const handleAddChange = (e) => {
  //   console.log("handleChangelog: ", e);
  //   e.persist();
  //   let value = e.target.value;

  //   if (e.target.name === "metascore") {
  //     value = parseInt(value, 10);
  //   }

  //   setAddMovie({
  //     ...addMovie,
  //     [e.target.name]: value
  //   });
  // };

  const addStars = (e) => {
    e.preventDefault();

    let starArray = [];
    if (addMovie.stars) {
      starArray = [addMovie.stars];
      starArray.split(",");
    } else {
      starArray = [];
    }

    setAddMovie({
      ...addMovie,
      stars: starArray
    });
  };
  const clickHandle = () => {
    history.push("/");
  };

  // const handleStar = (e) => {
  //   e.persist();
  //   console.log("handle star console.log: ", e);
  //   if (typeof addMovie.stars === "string") {
  //     const starArray = addMovie.stars.split(",");
  //     console.log("the star array", starArray);
  //     setAddMovie({
  //       ...addMovie,
  //       [e.target.name]: e.target.value,
  //       stars: starArray
  //     });
  //   }
  // };

  return (
    <div>
      <h2>Add a Movie</h2>
      <form onSubmit={newMovie}>
        <input
          type="text"
          name="title"
          placeholder="Add Title"
          value={addMovie.title}
          onChange={(e) =>
            setAddMovie({
              ...addMovie,
              title: e.target.value
            })
          }
        />
        <input
          type="text"
          name="director"
          placeholder="Add director"
          value={addMovie.director}
          onChange={(e) =>
            setAddMovie({
              ...addMovie,
              director: e.target.value
            })
          }
        />
        <input
          type="number"
          name="metascore"
          placeholder="Add Metascore"
          value={addMovie.metascore}
          onChange={(e) => {
            setAddMovie({
              ...addMovie,
              metascore: e.target.value
            });
          }}
        />
        <input
          type="text"
          name="stars"
          placeholder="Add stars"
          value={addMovie.stars}
          onChange={(e) =>
            setAddMovie({
              ...addMovie,
              stars: [e.target.value]
            })
          }
        />

        <button type="submit" className="add-movie-btn">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovieForm;
