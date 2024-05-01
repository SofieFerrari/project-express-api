console.log("hello world")

import express from "express";
import cors from "cors";

import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});
app.get("/songs", (req, res) => {
  res.json(topMusicData)
})

//routeparam
app.get("/songs/:songId", (req, res) => {
  const { songId } = req.params

  const song = topMusicData.find(song => +songId === song.id)

  if (song) {
  res.json(song)
  } else {
    res.status(404).send("song not found")
  }
})

app.get("./songs/:sortArtists", (req, res) => {
  const { sortArtists } = req.params
  console.log(sortArtists)

  const artistDecending = topMusicData.sort()

  res.json(artistDecending)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
