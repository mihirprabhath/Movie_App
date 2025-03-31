import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";
import Footer from "../components/Footer";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setIsSearching(true);
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("No movies found. Try a different search term.");
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    if (!searchQuery) return;
    setSearchQuery("");
    setLoading(true);
    getPopularMovies()
      .then((popularMovies) => {
        setMovies(popularMovies);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load popular movies.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">Discover Your Next Favorite Movie</h1>
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for movies..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search movies"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-button"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
            <button type="submit" className="search-button" disabled={loading}>
              {isSearching ? (
                <span className="spinner"></span>
              ) : (
                <span>Search</span>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="content-container">
        {error && (
          <div className="error-message">
            <p>{error}</p>
            {error.includes("No movies found") && (
              <button onClick={handleClearSearch} className="back-button">
                Back to Popular Movies
              </button>
            )}
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading movies...</p>
          </div>
        ) : (
          <>
            <h2 className="section-title">
              {searchQuery ? "Search Results" : "Popular Movies"}
            </h2>
            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
            {movies.length === 0 && !error && (
              <div className="empty-state">
                <p>No movies found. Try a different search.</p>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;