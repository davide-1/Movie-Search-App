import React, { useRef, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import MovieCard from "./MovieCard";

type MovieRowProps = {
  title: string;
  movies: any[];
  onLoadMore?: () => void;
};

export default function MovieRow({ title, movies, onLoadMore }: MovieRowProps) {
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

  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          ml: 2,
          fontWeight: 600,
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
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
          
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#444",
            borderRadius: "8px",
          },
        }}
      >
        {movies.map((movie) => (
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
