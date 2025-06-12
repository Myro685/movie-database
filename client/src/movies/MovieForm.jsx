import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { apiGet } from "../utils/api";

import FlashMessage from "../components/FlashMessage";
import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import InputCheck from "../components/InputCheck";

import Genre from "./Genre";

const MovieForm = () => {
  // inicializace proměnných pomocí useState()
  const { id } = useParams();

  const [directorListState, setDirectorList] = useState([]);
  const [actorListState, setActorList] = useState([]);
  const [genreListState, setGenreList] = useState([]);
  const [movieNameState, setMovieName] = useState("");
  const [yearState, setYear] = useState(0);
  const [directorState, setDirector] = useState("");
  const [actorsState, setActors] = useState([]);
  const [genresState, setGenres] = useState([]);
  const [availableState, setAvailable] = useState(false);
  const [sentState, setSent] = useState(false);
  const [successState, setSuccess] = useState(false);
  const [errorState, setError] = useState();

  // handleChange(e) {obsluha vstupů formuláře}
  const handleChange = (e) => {
    const target = e.target;

    let temp;
    if (["actors", "genres"].includes(target.name)) {
      temp = Array.from(target.selectedOptions, (item) => item.value);
    } else if (target.name === "available") {
      temp = target.checked;
    } else {
      temp = target.value;
    }

    const name = target.name;
    const value = temp;

    if (name === "movieName") {
      console.log(value);
      setMovieName(value);
    } else if (name === "year") {
      console.log(value);
      setYear(value);
    } else if (name === "director") {
      console.log(value);
      setDirector(value);
    } else if (name === "actors") {
      console.log(value);
      setActors(value);
    } else if (name === "genres") {
      console.log(value);
      setGenres(value);
    } else if (name === "available") {
      console.log(value);
      setAvailable(value);
    }
  };
  // handleSubmit(e) {obsluha odeslání formuláře}
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // useEffect() {načtení existujícího záznamu}
  useEffect(() => {
    if (id) {
      apiGet("/api/movies/" + id).then((data) => {
        setMovieName(data.name);
        setYear(data.year);
        setDirector(data.directorID);
        setActors(data.actorIDs);
        setGenres(data.genres);
        setAvailable(data.isAvailable);
      });
      apiGet("/api/directors").then((data) => setDirectorList(data));
      apiGet("/api/actors").then((data) => setActorList(data));
      apiGet("/api/genres").then((data) => setGenreList(data));
    }
  }, [id]);

  // vykreslení formuláře
  const sent = sentState;
  const success = successState;

  return (
    <div>
      <h1>{id ? "Upravit" : "Vytvořit"} film</h1>
      <hr />
      {errorState ? <div className="alert alert-danger">{errorState}</div> : ""}
      {sent && success ? (
        <FlashMessage
          theme={"success"}
          text={"Uložení filmu proběhlo úspěšně."}
        />
      ) : null}

      <form onSubmit={handleSubmit}>
        <InputField
          required={true}
          type="text"
          name="movieName"
          min="3"
          label="Název"
          prompt="Zadejte název díla"
          value={movieNameState}
          handleChange={handleChange}
        />

        <InputField
          required={true}
          type="number"
          name="year"
          label="Rok vydání"
          prompt="Zadejte rok vydání"
          min="0"
          value={yearState}
          handleChange={handleChange}
        />

        <InputSelect
          name="director"
          items={directorListState}
          label="Režie"
          prompt="Vyberte režiséra"
          value={directorState}
          handleChange={handleChange}
        />

        <InputSelect
          required={true}
          name="actors"
          items={actorListState}
          multiple={true}
          label="Hrají"
          prompt="Označte herce"
          value={actorsState}
          handleChange={handleChange}
        />

        <InputSelect
          required={true}
          name="genres"
          items={genreListState}
          multiple={true}
          enum={Genre}
          label="Žánr"
          prompt="Označte žánry"
          value={genresState}
          handleChange={handleChange}
        />

        <InputCheck
          type="checkbox"
          name="available"
          label="Dostupný"
          value={availableState}
          checked={availableState}
          handleChange={handleChange}
        />

        <input type="submit" className="btn btn-primary" value="Uložit" />
      </form>
    </div>
  );
};

export default MovieForm;
