# 🎬 Movie Watchlist - MERN Application

A simple **Movie Watchlist Management System** built using **MERN Stack concepts** in a single `server.js` file.

This application combines:
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Frontend: React.js (CDN based)
- API: RESTful API

- 



Users can add movies, mark them as watched/unwatched, search movies, filter movies, and delete movies.

---


## 🚀 Features


✅ Add movies to watchlist  
✅ Mark movies as watched/unwatched  
✅ Delete movies  
✅ Search movies by title  
✅ Filter watched/unwatched movies  
✅ MongoDB database storage  
✅ REST API implementation  
✅ React frontend integrated inside Express  
✅ Single file deployment  

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS

### Frontend
- React.js
- React DOM
- Axios
- HTML
- CSS

---

## 📂 Project Structure


Movie-Watchlist/
│
├── server.js # Complete backend + frontend code
├── package.json
├── README.md


---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/movie-watchlist.git

Go inside project folder:

cd movie-watchlist
2. Install Dependencies
npm install express mongoose cors
3. Start MongoDB

Make sure MongoDB is running locally.

Default database:

mongodb://127.0.0.1:27017/movie_watchlist
4. Run Application
node server.js
🌐 Open Application

Visit:

http://localhost:5000
📌 API Endpoints
Get All Movies
GET /api/movies

Example:

http://localhost:5000/api/movies
Search Movies
GET /api/movies?q=movie_name

Example:

/api/movies?q=avatar
Filter Movies
Watched Movies
GET /api/movies?filter=watched
Unwatched Movies
GET /api/movies?filter=unwatched
Add Movie
POST /api/movies

Request:

{
  "title":"Avengers",
  "year":"2019",
  "notes":"Marvel movie"
}

Response:

{
 "_id":"12345",
 "title":"Avengers",
 "watched":false
}
Update Movie
PUT /api/movies/:id

Example:

PUT /api/movies/64abc123
Toggle Watched Status
PATCH /api/movies/:id/toggle-watched

Example:

PATCH /api/movies/64abc123/toggle-watched
Delete Movie
DELETE /api/movies/:id

Example:

DELETE /api/movies/64abc123
🗄️ Database Schema

Movie Model:

{
 title: String,
 year: String,
 poster: String,
 notes: String,
 watched: Boolean,
 createdAt: Date
}
📸 Application Flow
User
 |
 | Add/Search/Update/Delete Movie
 |
React Frontend
 |
Axios Requests
 |
Express REST API
 |
MongoDB Database
 |
Response
 |
React UI Update
🔮 Future Improvements
User authentication (JWT)
Movie ratings
Movie categories
Poster upload
Dark mode UI
Pagination
Movie API integration
Deployment on Render/Vercel
👨‍💻 Author

Sunil Kumar

B.Tech Information Technology

⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.
