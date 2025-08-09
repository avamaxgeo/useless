import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ListPage() {
  const { genreId, genreName } = useParams();
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    fetch(`https://useless-3.onrender.com/discover/${genreId}`)
      .then(res => res.json())
      .then(data => setMovies(data.results));
  }, [genreId]);

  return (
    <>
      <Link to="/" className="back-link">← Back to Genres</Link>
      <h1>{genreName}</h1>
      <div className="grid">
        {movies.filter(m => m.poster_path).map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="card movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
          </Link>
        ))}
      </div>
    </>
  );
}
export default ListPage;