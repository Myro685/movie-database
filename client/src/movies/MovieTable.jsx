import React from "react";
import { Link } from "react-router-dom";

const MovieTable = ({ label, items, deleteMovie }) => {
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
                  <Link
                    to={"/movies/edit/" + item._id}
                    className="btn btn-sm btn-warning"
                  >
                    Upravit
                  </Link>
                  <button
                    onClick={() => deleteMovie(item._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Odstranit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={"/movies/create"} className="btn btn-success">
        Nový film
      </Link>
    </div>
  );
};

export default MovieTable;
