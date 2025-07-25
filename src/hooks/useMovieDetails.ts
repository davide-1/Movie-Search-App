import { useQuery } from '@tanstack/react-query'
import { movieApi } from '../services/movieApi' 

export const fetchMovieDetails = async (id: string) => {
  const response = await movieApi.get(`/movie/${id}`)
  return response.data
}

export const useMovieDetails = (id: string) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetails(id),
    enabled: !!id,
  })
}
