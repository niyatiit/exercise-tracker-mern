const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const User = require("./model/user");
const Exercise = require("./model/exercise");

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Exercise Tracker API is running");
});

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.post("/api/users", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username
    });

    const savedUser = await user.save();

    res.json({
      username: savedUser.username,
      _id: savedUser._id
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "_id username");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/users/:_id/exercises", async (req, res) => {
  try {
    const { _id } = req.params;
    const { description, duration, date } = req.body;

    // find user
    const user = await User.findById(_id);
    if (!user) {
      return res.json({ error: "User not found" });
    }

    // handle date
    const exerciseDate = date ? new Date(date) : new Date();

    // save exercise
    const exercise = new Exercise({
      userId: _id,
      description,
      duration: Number(duration),
      date: exerciseDate
    });

    await exercise.save();

    res.json({
      _id: user._id,
      username: user.username,
      date: exerciseDate.toDateString(),
      duration: exercise.duration,
      description: exercise.description
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/users/:_id/logs", async (req, res) => {
  try {
    const { _id } = req.params;
    const { from, to, limit } = req.query;

    const user = await User.findById(_id);
    if (!user) {
      return res.json({ error: "User not found" });
    }

    let filter = { userId: _id };

    let exercises = await Exercise.find(filter);

    // date filtering
    if (from || to) {
      const fromDate = from ? new Date(from) : new Date("1970-01-01");
      const toDate = to ? new Date(to) : new Date();

      exercises = exercises.filter(ex => {
        const exDate = new Date(ex.date);
        return exDate >= fromDate && exDate <= toDate;
      });
    }

    // limit filter
    if (limit) {
      exercises = exercises.slice(0, Number(limit));
    }

    const log = exercises.map(ex => ({
      description: ex.description,
      duration: ex.duration,
      date: new Date(ex.date).toDateString()
    }));

    res.json({
      username: user.username,
      count: log.length,
      _id: user._id,
      log
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});