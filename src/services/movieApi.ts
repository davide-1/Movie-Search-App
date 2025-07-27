import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY; 


export const movieApi = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});


export const searchMovies = async (query: string) => {
  try {
    const response = await movieApi.get('/search/movie', {
      params: { query }, 
    });

    return response.data.results;
  } catch (error: any) {
    console.error('searchMovies API error:', error);
    const message =
      error?.response?.data?.status_message ||
      error?.message ||
      'Something went wrong while fetching movies.';
    throw new Error(message);
  }
};


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

  const response = await movieApi.get(endpoint, {
    params: { page }, 
  });

  return response.data;
};
