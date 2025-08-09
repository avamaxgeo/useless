import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    // Fetches movie genres from the FastAPI backend.
    // Ensure your backend is running at http://127.0.0.1:8000
    fetch('https://useless-3.onrender.com/genres')
      .then(res => res.json())
      .then(data => setGenres(data.genres))
      .catch(error => console.error("Error fetching genres:", error)); // Basic error handling
  }, []);

  return (
    <>
      {/* Changed title from "Movie Mashup" to "Kariveppila Reviews" */}
      <h1>Kariveppila Reviews 🌿🎬</h1>
      <p>Select a genre to begin.</p>
      <div className="grid">
        {genres.map(genre => (
          <Link to={`/genre/${genre.id}/${genre.name}`} key={genre.id} className="card genre-card">
            {genre.name}
          </Link>
        ))}
      </div>
    </>
  );
}
export default HomePage;