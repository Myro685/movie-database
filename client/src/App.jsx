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
import MovieDetail from "./movies/MovieDetail";
import MovieForm from "./movies/MovieForm";
import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";

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
          <Route path="/movies">
            <Route index element={<MovieIndex />} />
            <Route path="show/:id" element={<MovieDetail />} />
            <Route path="create" element={<MovieForm />} />
            <Route path="edit/:id" element={<MovieForm />} />
          </Route>
          <Route path="/people">
            <Route index element={<PersonIndex />} />
            <Route path="show/:id" element={<PersonDetail />} />
            <Route path="create" element={<PersonForm />} />
            <Route path="edit/:id" element={<PersonForm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
