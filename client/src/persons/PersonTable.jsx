import React from "react";
import { Link } from "react-router-dom";

const PersonTable = ({ label, items, link }) => {
  return (
    <div>
      <p>
        {label} {items.length}
      </p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Jméno</th>
            <th colSpan={3}>Akce</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>
                <div className="btn-group">
                  <Link
                    to={"/people/show/" + item._id}
                    className="btn btn-sm btn-info"
                  >
                    Zobrazit
                  </Link>
                  <Link
                    to={"/people/edit/" + item._id}
                    className="btn btn-sm btn-warning"
                  >
                    Upravit
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {link ? (
        <Link to={"/people/create"} className="btn btn-success">
          Nová osobnost
        </Link>
      ) : null}
    </div>
  );
};

export default PersonTable;
