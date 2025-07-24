
import { useQuery } from '@tanstack/react-query'
import { searchMovies } from '../services/movieApi'

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchMovies(query),
    enabled: !!query, 
    
  })
}
