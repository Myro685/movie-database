import React from "react";
import { Link } from "react-router-dom";

const MovieTable = ({ label, items }) => {
  return (
    <div>
      <p>
        {label} {items.length}
      </p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Název</th>
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
                    to={"/movies/show/" + item._id}
                    className="btn btn-sm btn-info"
                  >
                    Zobrazit
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
