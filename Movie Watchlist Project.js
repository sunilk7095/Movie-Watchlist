/**
 * 🎬 Movie Watchlist (MERN in One File)
 * Single-file Express + MongoDB + React app
 * Run: node server.js
 */

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/movie_watchlist";

// ====== Database ======
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: String,
  poster: String,
  notes: String,
  watched: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Movie = mongoose.model("Movie", MovieSchema);

// ====== Middleware ======
app.use(cors());
app.use(express.json());

// ====== API Routes ======
app.get("/api/movies", async (req, res) => {
  try {
    const { q, filter } = req.query;
    const query = {};
    if (q) query.title = { $regex: q, $options: "i" };
    if (filter === "watched") query.watched = true;
    if (filter === "unwatched") query.watched = false;

    const movies = await Movie.find(query).sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/movies", async (req, res) => {
  try {
    const { title, year, poster, notes } = req.body;
    if (!title) return res.status(400).json({ error: "Title required" });
    const movie = new Movie({ title, year, poster, notes });
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.patch("/api/movies/:id/toggle-watched", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    movie.watched = !movie.watched;
    await movie.save();
    res.json(movie);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// ====== Serve Frontend (React in one file) ======
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Movie Watchlist</title>
  <style>
    body { font-family: Arial, sans-serif; margin:20px; background:#f5f5f5; }
    .container{max-width:800px;margin:auto;background:#fff;padding:20px;border-radius:8px}
    .movie{border:1px solid #ddd;padding:10px;margin:5px 0;display:flex;justify-content:space-between}
    .watched{opacity:0.6;text-decoration:line-through}
  </style>
</head>
<body>
  <div id="root"></div>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script crossorigin src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script>
    const { useState, useEffect } = React;

    function App(){
      const [movies,setMovies] = useState([]);
      const [title,setTitle] = useState("");

      const load = async()=> {
        const res = await axios.get('/api/movies');
        setMovies(res.data);
      };
      useEffect(()=>{ load(); },[]);

      const add = async(e)=>{
        e.preventDefault();
        if(!title.trim()) return;
        await axios.post('/api/movies',{title});
        setTitle("");
        load();
      };
      const toggle = async(id)=>{
        await axios.patch('/api/movies/'+id+'/toggle-watched');
        load();
      };
      const del = async(id)=>{
        await axios.delete('/api/movies/'+id);
        load();
      };

      return React.createElement("div",{className:"container"},
        React.createElement("h1",null,"🎬 Movie Watchlist"),
        React.createElement("form",{onSubmit:add},
          React.createElement("input",{value:title,onChange:e=>setTitle(e.target.value),placeholder:"Add movie..."}),
          React.createElement("button",{type:"submit"},"Add")
        ),
        movies.map(m=>
          React.createElement("div",{key:m._id,className:"movie"},
            React.createElement("span",{className:m.watched?"watched":""},m.title),
            React.createElement("div",null,
              React.createElement("button",{onClick:()=>toggle(m._id)},m.watched?"Unwatch":"Watch"),
              React.createElement("button",{onClick:()=>del(m._id)},"Delete")
            )
          )
        )
      );
    }

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(React.createElement(App));
  </script>
</body>
</html>
  `);
});

// ====== Start Server ======
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
