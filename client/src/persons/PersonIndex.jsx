import React, { useState, useEffect } from "react";
import { apiGet, apiDelete } from "../utils/api";
import PersonTable from "./PersonTable";

const PersonIndex = () => {
  const [directorsState, setDirectors] = useState([]);
  const [actorsState, setActors] = useState([]);

  useEffect(() => {
    apiGet("/api/directors").then((data) => setDirectors(data));

    apiGet("/api/actors").then((data) => setActors(data));
  }, []);

  const deleteDirector = async (id) => {
    try {
      await apiDelete("/api/people/" + id);
      setDirectors(directorsState.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteActor = async (id) => {
    console.log("Mazání herce s id:", id);
    try {
      await apiDelete("/api/people/" + id);
      setActors(actorsState.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const moreActors = actorsState.length > directorsState.length;

  return (
    <div>
      <h1>Seznam osobností</h1>
      <hr />

      <div className="row">
        <div className="col">
          <PersonTable
            deletePerson={deleteActor}
            items={actorsState}
            label="Počet herců:"
            link={!moreActors}
          />
        </div>
        <div className="col">
          <PersonTable
            deletePerson={deleteDirector}
            items={directorsState}
            label="Počet režisérů:"
            link={moreActors}
          />
        </div>
      </div>
    </div>
  );
};
export default PersonIndex;
