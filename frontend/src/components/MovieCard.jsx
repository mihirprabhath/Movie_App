import { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieCard.css";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const [isHovered, setIsHovered] = useState(false);

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div 
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="movie-poster">
        <img 
          src={movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/placeholder-movie.jpg'} 
          alt={movie.title}
          loading="lazy"
        />
        <div className="movie-overlay">
          <button 
            className={`favorite-btn ${favorite ? "active" : ""}`} 
            onClick={onFavoriteClick}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <span className="heart-icon">{favorite ? "❤️" : "🤍"}</span>
          </button>
          {isHovered && (
            <div className="movie-details">
              <p className="movie-overview">{movie.overview?.substring(0, 150)}...</p>
              <div className="movie-meta">
                <span className="rating">
                  ⭐ {movie.vote_average?.toFixed(1)}/10
                </span>
                <span className="release-year">
                  🗓 {movie.release_date?.split("-")[0]}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="info-footer">
          <span className="year">{movie.release_date?.split("-")[0]}</span>
          <span className="rating-badge">
            {movie.vote_average?.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;