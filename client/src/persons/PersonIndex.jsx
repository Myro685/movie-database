import React, { useState, useEffect } from "react";
import { apiGet } from "../utils/api";
import PersonTable from "./PersonTable";

const PersonIndex = () => {
  const [directorsState, setDirectors] = useState([]);
  const [actorsState, setActors] = useState([]);

  useEffect(() => {
    apiGet("/api/directors").then((data) => setDirectors(data));
    apiGet("/api/actors").then((data) => setActors(data));
  }, []);

  const moreActors = actorsState.length > directorsState.length;

  return (
    <div>
      <h1>Seznam osobností</h1>
      <hr />

      <div className="row">
        <div className="col">
          <PersonTable
            items={actorsState}
            label="Počet herců:"
            link={!moreActors}
          />
        </div>
        <div className="col">
          <PersonTable
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
