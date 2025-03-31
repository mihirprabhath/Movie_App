import { useEffect, useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import "../css/Favorites.css";

function Favorites() {
  const { favorites } = useMovieContext();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [favorites]);

  if (favorites.length > 0) {
    return (
      <div className="favorites">
        <div className="favorites-header">
          <h2 className="favorites-title">
            <span className="title-icon">❤️</span>
            Your Favorite Movies
          </h2>
          <p className="favorites-count">
            {favorites.length} {favorites.length === 1 ? "movie" : "movies"} saved
          </p>
        </div>
        
        <div className="movies-grid">
          {favorites.map((movie, index) => (
            <MovieCard 
              movie={movie} 
              key={movie.id} 
              className={animate ? "card-animate" : ""}
              style={{ animationDelay: `${index * 0.05}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <div className="empty-content">
        <div className="empty-icon">🎬</div>
        <h2>Your Favorites Collection is Empty</h2>
        <p>Discover amazing movies and click the heart icon to add them here!</p>
        <a href="/" className="discover-button">
          Discover Movies
        </a>
      </div>
    </div>
  );
}

export default Favorites;