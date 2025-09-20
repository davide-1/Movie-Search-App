
import * as React from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useFeaturedMovie,
  useFeaturedTrailer,
} from "../hooks/useFeaturedMovie";

const IMG = (path?: string | null) =>
  path ? `https://image.tmdb.org/t/p/original${path}` : undefined;

export default function FeaturedHero() {
  const navigate = useNavigate();
  const { data: movie, isLoading } = useFeaturedMovie();
  const { data: trailerKey } = useFeaturedTrailer(movie || undefined);

  if (isLoading) {
    return (
      <Container
        maxWidth={false}
        sx={{ maxWidth: { lg: 1280, xl: 1440 }, mx: "auto", px: 3 }}
      >
        <Box sx={{ height: { xs: 200, sm: 260, md: 320, xl: 380 } }}>
          <Skeleton
            variant="rectangular"
            sx={{ height: "100%", borderRadius: 2 }}
          />
        </Box>
      </Container>
    );
  }
  if (!movie) return null;

  const title = movie.title || movie.name || "Untitled";
  const toDetails =
    movie.media_type === "tv" ? `/tv/${movie.id}` : `/movie/${movie.id}`;

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: { lg: 1280, xl: 1440 },
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4 },
        my: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: { xs: 320, sm: 420, md: 520, xl: 720 },
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "grey.800", 
          boxShadow: "0 12px 40px rgba(0,0,0,.35)", 
          outline: "1px solid rgba(255,255,255,.06)",
        }}
      >
        {/* Video fills and covers */}
        <Box
          component="iframe"
          src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${trailerKey}&playsinline=1`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen={false}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            minWidth: "100%",
            minHeight: "100%",
            width: "177.78%", 
            height: "100%",
            transform: "translate(-50%, -50%)",
            border: 0,
            pointerEvents: "none",
            objectFit: "cover",
          }}
        />

        {/* Overlay for readability */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,.7) 0%, rgba(0,0,0,.2) 60%, transparent 100%)",
          }}
        />

        {/* Content */}
        <Stack
          justifyContent="flex-end"
          spacing={1}
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            p: { xs: 2, sm: 3 },
            maxWidth: 600,
          }}
        >
          <Typography
            component="h1"
            sx={{ fontWeight: 700, fontSize: { xs: 18, sm: 22, md: 28 } }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.9,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {movie.overview}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="contained"
              onClick={() => navigate(toDetails)}
              sx={{
                bgcolor: "rgba(109,109,110,0.7)", 
                color: "white",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "999px",
                px: 2.5,
                "&:hover": {
                  bgcolor: "rgba(109,109,110,0.9)", 
                },
              }}
            >
              More Info
            </Button>

            {/* Outlined "Favorites" style */}
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigate("/favorites")}
              sx={{
                borderColor: "rgba(255,255,255,0.6)",
                color: "white",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "999px",
                px: 2.5,
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              ❤️ Favorites
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
