import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/genres')
      .then(res => res.json())
      .then(data => setGenres(data.genres));
  }, []);

  return (
    <>
      <h1>Movie Mashup 🎬</h1>
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