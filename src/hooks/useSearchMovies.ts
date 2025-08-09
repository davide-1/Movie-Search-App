
import { useQuery } from '@tanstack/react-query'
import { searchMovies } from '../services/movieApi'
import axios from 'axios'


// Custom hook to search for movies using React Query
export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
    retry: (failureCount, error: any) => {
      
      // Custom retry logic: don't retry if it's a 404 error
      if (axios.isAxiosError(error) && error.response?.status === 404) return false
      return failureCount < 2
    },
    // Retry delay increases with each attempt, up to 3s max
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 3000),
  })
}

