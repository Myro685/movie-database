import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { apiGet } from "../utils/api";
import Genre from "./Genre";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    apiGet("/api/movies/" + id)
      .then((data) => {
        setMovie({
          name: data.name,
          year: data.year,
          director: data.director,
          actors: data.actors,
          genres: data.genres,
          isAvailable: data.isAvailable,
          dateAdded: data.dateAdded,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const genres = movie.genres?.map((item) => Genre[item]);
  const actors = movie.actors?.map((item) => item.name);
  const dateAdded = new Date(movie.dateAdded).toLocaleString();

  return (
    <div>
      <h1>Detail filmu</h1>
      <hr />
      <h3>
        {movie.name} <small>({movie.year})</small>
      </h3>
      <p>{genres?.join(" / ")}</p>
      <p>
        <strong>Režie: </strong>
        {movie.director?.name}
        <br />
        <strong>Hrají: </strong>
        {actors?.join(", ")}
        <br />
        <strong>Dostupný: </strong>
        {movie.isAvailable ? "ANO" : "NE"}
        <br />
        <em>Vytvořeno {dateAdded}</em>
      </p>
    </div>
  );
};

export default MovieDetail;
