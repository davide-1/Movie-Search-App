
import axios from 'axios'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjYwMTYwNDQzYTA0MTQwNTVlMThjOTY3MGEwZmRjZSIsIm5iZiI6MTc1MzMwOTc0MC4wLCJzdWIiOiI2ODgxNjIyYjY1ODViZDRlZGJkOWEyZDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tX06XH2gsGCax-C2RPRSFcV4j7hRAPlU1wq_ShMM-Ck'

export const movieApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
})



export const searchMovies = async (query: string) => {
  const response = await movieApi.get(`/search/movie`, {
    params: { query },
  })
  return response.data.results
}