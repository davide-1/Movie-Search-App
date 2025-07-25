
import axios from 'axios'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN

export const movieApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
})

export const searchMovies = async (query: string) => {
  try {
    const response = await movieApi.get(`/search/movie`, {
      params: { query },
    })

    return response.data.results
  } catch (error: any) {
    
    console.error('searchMovies API error:', error)

    
    const message =
      error?.response?.data?.status_message ||
      error?.message ||
      'Something went wrong while fetching movies.'

    
    throw new Error(message)
  }
}