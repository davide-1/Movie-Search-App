
import { useQuery } from '@tanstack/react-query'
import { searchMovies } from '../services/movieApi'
import axios from 'axios'

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
    retry: (failureCount, error: any) => {
      
      if (axios.isAxiosError(error) && error.response?.status === 404) return false
      return failureCount < 2
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 3000), // backoff
  })
}

