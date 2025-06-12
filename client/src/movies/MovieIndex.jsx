import React, { useState, useEffect } from "react";
import { apiGet, apiDelete } from "../utils/api";
import MovieTable from "./MovieTable";

const MovieIndex = () => {
  const [moviesState, setMovies] = useState([]);

  useEffect(() => {
    apiGet("/api/movies").then((data) => setMovies(data));
  }, []);

  const deleteMovie = async (id) => {
    await apiDelete("/api/movies/" + id);
    setMovies(moviesState.filter((movie) => movie._id !== id));
  };

  return (
    <div>
      <h1>Seznam filmů</h1>
      <hr />
      <MovieTable
        deleteMovie={deleteMovie}
        items={moviesState}
        label="Počet filmů:"
      />
    </div>
  );
};

export default MovieIndex;
