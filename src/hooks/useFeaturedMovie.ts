
import { useQuery } from "@tanstack/react-query";

export type TMDBMovie = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string | null;
  media_type?: "movie" | "tv";
};

const TMDB = "https://api.themoviedb.org/3";
const KEY = process.env.REACT_APP_TMDB_API_KEY as string;

async function fetchFeatured(): Promise<TMDBMovie | null> {
  const res = await fetch(`${TMDB}/trending/all/week?api_key=${KEY}`);
  const data = await res.json();
  return (data.results || []).find((x: TMDBMovie) => x.backdrop_path) ?? null;
}

async function fetchVideos(movie: TMDBMovie) {
  const type = movie.media_type === "tv" ? "tv" : "movie";
  const res = await fetch(`${TMDB}/${type}/${movie.id}/videos?api_key=${KEY}`);
  const data = await res.json();
  // Prefer an official YouTube Trailer; fall back to any YouTube video
  const vids = (data.results || []).filter((v: any) => v.site === "YouTube");
  const trailer =
    vids.find((v: any) => v.type === "Trailer" && v.official) ||
    vids.find((v: any) => v.type === "Trailer") ||
    vids[0];
  return trailer?.key || null;
}

export function useFeaturedMovie() {
  return useQuery({ queryKey: ["featured"], queryFn: fetchFeatured, staleTime: 6e5 });
}

export function useFeaturedTrailer(movie: TMDBMovie | undefined) {
  return useQuery({
    queryKey: ["featuredTrailer", movie?.id],
    queryFn: () => (movie ? fetchVideos(movie) : null),
    enabled: !!movie,
    staleTime: 6e5,
  });
}
