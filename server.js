const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.post("/api/workouts", (req, res) => {
  req.body.day = Date.now();
  db.Workout.create(req.body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/api/workouts/:id"),
  (req, res) => {
    db.Workout.update(
      {
        _id: req.params.id,
      },
      {
        $push: {
          exercises: req.body,
        },

        $inc: {
          totalDuration: req.body.duration,
        },
      },
      {
        new: true,
      }
    )
      .then((dbExercise) => {
        res.json(dbExercise);
      })
      .catch((err) => {
        res.json(err);
      });
  };

app.get("/stats", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/api/workouts/range", function (req, res) {
    db.Workout.find({
        day: {
            // $gte: new Date(new Date(Sunday).setHours(00, 00, 00)),
            $lt: new Date()
          }
    })
  .sort({ day: "asc" })
  .then((dbWorkout) => {
    res.json(dbWorkout);
  })
  .catch((err) => {
    res.json(err);
  });
})
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
