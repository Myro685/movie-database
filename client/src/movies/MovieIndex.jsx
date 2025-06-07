import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import MovieTable from "./MovieTable";

const MovieIndex = () => {
  const [movieState, setMovies] = useState([]);

  useEffect(() => {
    apiGet("/api/movies").then((data) => setMovies(data));
  }, []);

  return (
    <div>
      <h1>Seznam filmů</h1>
      <hr />
      <MovieTable items={movieState} label="Počet filmů:" />
    </div>
  );
};

export default MovieIndex;
