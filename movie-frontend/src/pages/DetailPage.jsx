import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function DetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://useless-6.onrender.com/movie/${movieId}`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [movieId]);

  if (!movie) return <div className="loading">Loading Mashup...</div>;

  return (
    <>
      <Link to="/" className="back-link">← Start Over</Link>
      <div className="detail-container">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="details">
          <h1>{movie.title}</h1>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10</p>
          <h2>Plot Summary</h2>
          <p>{movie.overview}</p>
        </div>
      </div>
    </>
  );
}
export default DetailPage;