import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MovieIndex from "./movies/MovieIndex";
import PersonIndex from "./persons/PersonIndex";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-ligh bg-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/movies"} className="nav-link">
                Filmy
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/people"} className="nav-link">
                Osobnosti
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route index element={<Navigate to={"/movies"} />} />
          <Route exact path="/movies" element={<MovieIndex />} />
          <Route exact path="/people" element={<PersonIndex />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
