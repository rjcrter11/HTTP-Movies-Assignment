import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { quickAxios } from "../utils/axios";
const initialValues = {
  id: null,
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateForm = (props) => {
  const [movie, setMovie] = useState(initialValues);

  console.log("movie log in updateForm", movie);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const movieToUpdate = props.movieList.find((movie) => `${movie.id}` === id);

    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
    quickAxios()
      .get(`movies/${id}`)
      .then((res) => setMovie(res.data));
  }, [props.movieList, id]);

  const handleChanges = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };
  const handleStar = (index) => (e) => {
    setMovie({
      ...movie,
      stars: movie.stars.map((star, starIndex) => {
        return starIndex === index ? e.target.value : star;
      })
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    quickAxios()
      .put(`movies/${id}`, movie)
      .then((res) => {
        console.log(res);
        history.push("/");
      })

      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2 className="update-form">Update Movie</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={movie.title}
          onChange={handleChanges}
        />
        <div className="form-inputs">
          <input
            type="text"
            name="director"
            placeholder="Director"
            value={movie.director}
            onChange={handleChanges}
          />
        </div>
        <div className="form-inputs">
          <input
            type="number"
            name="metascore"
            placeholder="Metascore"
            value={movie.metascore}
            onChange={handleChanges}
          />
        </div>

        {movie.stars.map((starName, index) => {
          return (
            <div className="form-inputs">
              <input
                key={index}
                type="text"
                name="stars"
                placeholder="Stars"
                value={starName}
                onChange={handleStar(index)}
              />
            </div>
          );
        })}

        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
