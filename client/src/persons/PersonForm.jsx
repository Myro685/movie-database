import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { apiGet } from "../utils/api";
import { dateStringFormatter } from "../utils/dateStringFormatter";

import FlashMessage from "../components/FlashMessage";
import InputField from "../components/InputField";
import InputCheck from "../components/InputCheck";

import Role from "./Role";

const PersonForm = () => {
  const { id } = useParams();

  const [personNameState, setPersonName] = useState("");
  const [birthDateState, setBirthDate] = useState("");
  const [countaryState, setCountry] = useState("");
  const [biographyState, setBiography] = useState("");
  const [personRoleState, setPersonRole] = useState("");
  const [sentState, setSent] = useState(false);
  const [successState, setSuccess] = useState(false);
  const [errorState, setError] = useState(null);

  useEffect(() => {
    if (id) {
      apiGet("/api/people/" + id).then((data) => {
        setPersonName(data.name);
        setBirthDate(dateStringFormatter(data.birthDate));
        setCountry(data.country);
        setBiography(data.biography);
        setPersonRole(data.role);
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const sent = sentState;
  const success = successState;

  return (
    <div>
      <h1>{id ? "Upravit" : "Vztvořit"} osobnost</h1>
      <hr />
      {errorState ? (
        <div className="alert alert-danger">{errorState}</div>
      ) : null}
      {sent && success ? (
        <FlashMessage
          theme={"success"}
          text={"Uložení osobnosti proběhlo úspěšně."}
        />
      ) : null}

      <form onSubmit={handleSubmit}>
        <InputField
          required={true}
          type="text"
          name="personName"
          min="3"
          label="Jméno"
          prompt="Zadejte celé jméno"
          value={personNameState}
          handleChange={(e) => {
            setPersonName(e.target.value);
            console.log(personNameState);
          }}
        />

        <InputField
          required={true}
          type="date"
          name="birthDate"
          label="Datum narození"
          prompt="Zadejte datum narození"
          min="0000-01-01"
          value={birthDateState}
          handleChange={(e) => {
            setBirthDate(e.target.value);
            console.log(birthDateState);
          }}
        />

        <InputField
          required={true}
          type="text"
          name="country"
          min="2"
          label="Země původu"
          prompt="Zadejte zemi původu"
          value={countaryState}
          handleChange={(e) => {
            setCountry(e.target.value);
            console.log(countaryState);
          }}
        />

        <InputField
          required={true}
          type="textarea"
          name="biography"
          minLength="10"
          label="Biografie"
          prompt="Napište biografii"
          rows="5"
          value={biographyState}
          handleChange={(e) => {
            setBiography(e.target.value);
            console.log(biographyState);
          }}
        />

        <h6>Role:</h6>

        <InputCheck
          type="radio"
          name="personRole"
          label="Režisér"
          value={Role.DIRECTOR}
          handleChange={(e) => {
            setPersonRole(e.target.value);
            console.log(personRoleState);
          }}
          checked={Role.DIRECTOR === personRoleState}
        />

        <InputCheck
          type="radio"
          name="personRole"
          label="Herec"
          value={Role.ACTOR}
          handleChange={(e) => {
            setPersonRole(e.target.value);
            console.log(personRoleState);
          }}
          checked={Role.ACTOR === personRoleState}
        />

        <input type="submit" className="btn btn-primary" value="Uložit" />
      </form>
    </div>
  );
};

export default PersonForm;
