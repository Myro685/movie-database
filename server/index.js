/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *
 *                      ___ ___ ___
 *                     | . |  _| . |  LICENCE
 *                     |  _|_| |___|
 *                     |_|
 *
 *    REKVALIFIKAČNÍ KURZY  <>  PROGRAMOVÁNÍ  <>  IT KARIÉRA
 *
 * Tento zdrojový kód je součástí profesionálních IT kurzů na
 * WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci PRO obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

const API_PORT = 3000;
const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());
require("./cors")(app);
app.listen(API_PORT, () =>
  console.log("Listening on port " + API_PORT + "...")
);

// DB connection ----------------------------------------------------------
mongoose
  .connect("mongodb://127.0.0.1:27017/moviesdb", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((error) => console.error("Could not connect to MongoDB... ", error));
// -----------------------------------------------------------------------------

// Mongoose schemas ------------------------------------------------------
const movieSchema = new mongoose.Schema({
  name: String,
  year: Number,
  directorID: mongoose.Schema.Types.ObjectId,
  actorIDs: [mongoose.Schema.Types.ObjectId],
  genres: [String],
  isAvailable: Boolean,
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const personSchema = new mongoose.Schema({
  name: String,
  birthDate: Date,
  country: String,
  biography: String,
  role: String, // "actor" nebo "director"
});

const Movie = mongoose.model("Movie", movieSchema);
const Person = mongoose.model("Person", personSchema);
// -----------------------------------------------------------------------------

const genres = [
  "sci-fi",
  "adventure",
  "action",
  "romantic",
  "animated",
  "comedy",
];

// Validation functions --------------------------------------------------------
function validatePerson(person, required = true) {
  const schema = Joi.object({
    name: Joi.string().min(3),
    birthDate: Joi.date(),
    biography: Joi.string().min(10),
    country: Joi.string().min(2),
    role: Joi.string().valid("actor", "director"),
  });

  return schema.validate(person, {
    presence: required ? "required" : "optional",
  });
}

function validateMovie(movie, required = true) {
  const schema = Joi.object({
    name: Joi.string().min(3),
    directorID: Joi.string(),
    actorIDs: Joi.array(),
    isAvailable: Joi.bool(),
    genres: Joi.array()
      .items(Joi.string().valid(...genres))
      .min(1),
    year: Joi.number(),
  });

  return schema.validate(movie, {
    presence: required ? "required" : "optional",
  });
}

function validateGet(getData) {
  const schema = Joi.object({
    limit: Joi.number().min(1),
    fromYear: Joi.number(),
    toYear: Joi.number(),
    genre: Joi.string().valid(...genres),
    directorID: Joi.string().min(5),
    actorID: Joi.string().min(5),
  });

  return schema.validate(getData, { presence: "optional" });
}
// -----------------------------------------------------------------------------

// GET requests ----------------------------------------------------------------
app.get("/api/movies", (req, res) => {
  const { error } = validateGet(req.query);
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }

  let dbQuery = Movie.find();
  if (req.query.directorID)
    dbQuery = dbQuery.where("directorID", req.query.directorID);

  if (req.query.actorID) dbQuery = dbQuery.where("actorIDs", req.query.actorID);

  if (req.query.genre) dbQuery = dbQuery.where("genres", req.query.genre);

  if (req.query.fromYear)
    dbQuery = dbQuery.where("year").gt(req.query.fromYear);

  if (req.query.toYear) dbQuery = dbQuery.where("year").lt(req.query.toYear);

  if (req.query.limit) dbQuery = dbQuery.limit(parseInt(req.query.limit));

  dbQuery
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      res.status(400).send("Požadavek na filmy selhal!");
    });
});

app.get("/api/genres", (req, res) => {
  res.json(genres);
});

async function getMovieByID(id) {
  let movie = await Movie.findById(id);
  if (movie) {
    movie = movie.toJSON();
    let director = await Person.findById(movie.directorID).select("_id name");
    let actors = await Person.find()
      .where("_id")
      .in(movie.actorIDs)
      .select("_id name");
    movie.director = director.toJSON();
    movie.actors = JSON.parse(JSON.stringify(actors));
  }
  return movie;
}

app.get("/api/movies/:id", (req, res) => {
  getMovieByID(req.params.id)
    .then((movie) => {
      if (movie) res.send(movie);
      else res.status(404).send("Film s daným id nebyl nalezen!");
    })
    .catch((err) => {
      res.status(400).send("Chyba požadavku GET na film!");
    });
});

app.get("/api/people/:id", (req, res) => {
  Person.findById(req.params.id, (err, person) => {
    if (err) res.status(404).send("Člověk s daným ID nebyl nalezen.");
    else res.json(person);
  });
});

app.get("/api/actors", (req, res) => {
  const { error } = validateGet(req.query);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let dbQuery = Person.find().where("role", "actor");

  if (req.query.limit) dbQuery = dbQuery.limit(parseInt(req.query.limit));

  dbQuery
    .then((actors) => {
      res.json(actors);
    })
    .catch((err) => {
      res.status(400).send("Chyba požadavku na herce!");
    });
});

app.get("/api/directors", (req, res) => {
  const { error } = validateGet(req.query);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let dbQuery = Person.find().where("role", "director");

  if (req.query.limit) dbQuery = dbQuery.limit(parseInt(req.query.limit));

  dbQuery
    .then((directors) => {
      res.json(directors);
    })
    .catch((err) => {
      res.status(400).send("Chyba požadavku na režiséry!");
    });
});
// ---------------------------------------------------------------------------

// POST requests -------------------------------------------------------------
app.post("/api/movies", (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    Movie.create(req.body)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.send("Nepodařilo se uložit film!");
      });
  }
});

app.post("/api/people", (req, res) => {
  const { error } = validatePerson(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    Person.create(req.body)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.send("Nepodařilo se uložit osobu!");
      });
  }
});
// -----------------------------------------------------------------------------

// PUT requests ----------------------------------------------------------------
app.put("/api/movies/:id", (req, res) => {
  const { error } = validateMovie(req.body, false);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.send("Nepodařilo se uložit film!");
      });
  }
});

app.put("/api/people/:id", (req, res) => {
  const { error } = validatePerson(req.body, false);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.send("Nepodařilo se uložit osobu!");
      });
  }
});
// -----------------------------------------------------------------------------

// DELETE requsets ------------------------------------------------------------------
app.delete("/api/movies/:id", (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) res.json(result);
      else res.status(404).send("Film s daným id nebyl nalezen!");
    })
    .catch((err) => {
      res.send("Chyba při mazání filmu!");
    });
});

app.delete("/api/people/:id", (req, res) => {
  Movie.find({
    $or: [{ actorIDs: req.params.id }, { directorID: req.params.id }],
  })
    .countDocuments()
    .then((count) => {
      console.log(count);
      if (count != 0)
        res
          .status(400)
          .send(
            "Nelze smazat osobu, která je přiřazena k alespoň jednomu filmu!"
          );
      else {
        Person.findByIdAndDelete(req.params.id)
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            res.send("Nepodařilo se smazat osobu!");
          });
      }
    })
    .catch((err) => {
      res.status(400).send("Nepodařile se smazat osobu!");
    });
});
// -----------------------------------------------------------------------------
