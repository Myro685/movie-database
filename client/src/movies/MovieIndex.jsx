import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

const MovieIndex = (props) => {
  const [movieState, setMovies] = useState([]);

  useEffect(() => {
    apiGet("/api/movies").then((data) => setMovies(data));
  }, []);

  return (
    <div>
      <h1>Filmy</h1>
      <ul>
        {movieState.map((movie) => (
          <li key={movie._id}>{movie.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieIndex;
