import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';
import { fetchMoviesByType } from '../services/movieApi';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

type MovieApiResponse = {
  page: number;
  total_pages: number;
  results: Movie[];
};

export const useInfiniteMovies = (
  type: 'trending' | 'popular' | 'upcoming'
) => {
  return useInfiniteQuery<MovieApiResponse, Error>({
    queryKey: ['movies', type],
    queryFn: ({ pageParam }: QueryFunctionContext) =>
      fetchMoviesByType(type, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
  });
};



