import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY; 


export const movieApi = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});


// Search for movies by title or keyword
export const searchMovies = async (query: string) => {
  try {
    const response = await movieApi.get('/search/movie', {
      params: { query }, 
    });

    return response.data.results;
  } catch (error: any) {
    // Log the error and format a user-friendly error message
    console.error('searchMovies API error:', error);
    const message =
      error?.response?.data?.status_message || // TMDB error message
      error?.message ||
      'Something went wrong while fetching movies.';
    throw new Error(message);
  }
};


// Fetch movies by category (trending, popular, or upcoming)
export const fetchMoviesByType = async (type: string, page: number = 1) => {
  let endpoint = '';

  switch (type) {
    case 'trending':
      endpoint = '/trending/movie/week';
      break;
    case 'popular':
      endpoint = '/movie/popular';
      break;
    case 'upcoming':
      endpoint = '/movie/upcoming';
      break;
    default:
      throw new Error('Unknown movie type');
  }

  // Fetch data from selected endpoint with pagination
  const response = await movieApi.get(endpoint, {
    params: { page }, 
  });

  return response.data;
};


export const searchSuggestions = async (query: string) => {
  if (!query) return []
  const { data } = await movieApi.get('/search/movie', { params: { query, include_adult: false } })
  return (data.results ?? []).slice(0, 10).map((m: any) => ({
    id: m.id,
    label: m.title,
  }))
}