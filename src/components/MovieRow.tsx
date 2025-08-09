import React, { useRef, useEffect } from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import MovieCard from "./MovieCard";

type MovieRowProps = {
  title: string;
  movies: any[];
  onLoadMore?: () => void;
  isLoading?: boolean; // ✅ Accept loading prop
};

export default function MovieRow({
  title,
  movies,
  onLoadMore,
  isLoading = false,
}: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  // Infinite scroll detection
  useEffect(() => {
    const row = rowRef.current;
    if (!row || !onLoadMore) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = row;
      const nearEnd = scrollLeft + clientWidth >= scrollWidth - 200;

      if (nearEnd) onLoadMore();
    };

    row.addEventListener("scroll", handleScroll);
    return () => row.removeEventListener("scroll", handleScroll);
  }, [onLoadMore]);

  // Skeletons for loading state
  const skeletons = Array.from({ length: 6 });

  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          ml: 2,
          fontWeight: 600,
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
          backgroundColor: "#121212",
        }}
      >
        {title}
      </Typography>

      <Box
        ref={rowRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          px: { xs: 1.5, sm: 2 },
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {isLoading
          ? skeletons.map((_, i) => (
              <Box
                key={i}
                sx={{
                  flex: "0 0 auto",
                  minWidth: { xs: 140, sm: 160, md: 200 },
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={300}
                  sx={{ borderRadius: 2, bgcolor: "#2c2c2c" }}
                />
                <Skeleton width="80%" height={24} sx={{ mt: 1, bgcolor: "#2c2c2c" }} />
              </Box>
            ))
          : movies.map((movie) => (
              <Box
                key={movie.id}
                sx={{
                  flex: "0 0 auto",
                  minWidth: { xs: 140, sm: 160, md: 200 },
                }}
              >
                <MovieCard movie={movie} />
              </Box>
            ))}
      </Box>
    </Box>
  );
}

