import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { apiGet } from "../utils/api";
import { dateStringFormatter } from "../utils/dateStringFormatter";
import Role from "./Role";

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState({});

  useEffect(() => {
    apiGet("/api/people/" + id)
      .then((data) => {
        setPerson({
          name: data.name,
          birthDate: dateStringFormatter(data.birthDate, true),
          country: data.country,
          biography: data.biography,
          role: data.role,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const role = Role.DIRECTOR === person.role ? "Režisér" : "Herec";

  return (
    <div>
      <h1>Detail osobnosti</h1>
      <hr />
      <h3>{person.name}</h3>
      <p>
        {role}, nar. {person.birthDate}, {person.country}.
      </p>
      <p>
        <strong>Biografie:</strong>
        <br />
        {person.biography}
      </p>
    </div>
  );
};

export default PersonDetail;
