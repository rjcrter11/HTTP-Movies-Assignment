import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { quickAxios } from "../utils/axios";
const initialValues = {
  id: Date.now(),
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateForm = (props) => {
  // console.log("log props in UpdateForm component", props);
  const [movie, setMovie] = useState(initialValues);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const movieToUpdate = props.movieList.find((movie) => `${movie.id}` === id);

    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
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

  // const handleStars = (index) => (e) => {
  //   setMovie({
  //     ...movie
  //   });
  // };

  const handleSubmit = (e, index) => {
    e.preventDefault();
    e.persist();
    quickAxios()
      .put(`movies/${id}`, movie)
      .then((res) => {
        console.log(res.data.id);
        //  props.setMovieList(res.data);
        props.setMovieList(
          props.movieList.map((item) => {
            if (item.id === res.data.id) {
              props.movieList.splice(Number(id), 1, res.data);
            }
          })
        );

        // props.setMovieList(
        //   props.movieList.map((item) => {
        //     if (item.id === res.data.id) {
        //       console.log(res.data.id);
        //       item = { ...item, item: res.data };
        //     }
        //   })
        // );

        // const newMovieArr = props.movieList.map((item, index) => {
        //   if (item.id === movie.id) {
        //     props.setMovieList(item.slice(item[index], 1, res.data));
        //     return newMovieArr;
        //   }
        // });

        history.push("/");
      })

      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="form-inputs">
          {/* {movie.stars.map((name, index) => { */}

          <input
            // key={index}
            type="text"
            name="stars"
            placeholder="Stars"
            value={movie.stars}
            onChange={handleChanges}
          />

          {/* })} */}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateForm;
