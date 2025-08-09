// hooks/useSearchSuggestions.ts
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '../hooks/useDebounce'
import { searchSuggestions } from '../services/movieApi'

export function useSearchSuggestions(input: string) {
  const debounced = useDebounce(input, 300)

  return useQuery({
    queryKey: ['suggestions', debounced],
    queryFn: async () => {
      const titles = await searchSuggestions(debounced)
      return titles
    },
    enabled: debounced.length >= 2,
    staleTime: 60_000,
  })
}
