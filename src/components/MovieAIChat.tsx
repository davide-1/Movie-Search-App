// src/components/MovieAIChat.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { askAboutMovie, initWebLLM } from "../ai/webllm";

type MovieAIChatProps = {
  title: string;
  genres: string[];
  runtimeMins?: number;
  topCast: string[];
  plot: string;
};

export default function MovieAIChat(props: MovieAIChatProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [modelLoadingMsg, setModelLoadingMsg] = useState<string | null>(null);
  const [modelReady, setModelReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setModelLoadingMsg("Loading AI model, this may take a minute the first time.");
        await initWebLLM((msg) => {
          if (!cancelled) setModelLoadingMsg(msg);
        });
        if (!cancelled) {
          setModelReady(true);
          setModelLoadingMsg(null);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || "Failed to load AI model.");
          setModelLoadingMsg(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const disabled = useMemo(
    () => busy || !question.trim().length || !!modelLoadingMsg,
    [busy, question, modelLoadingMsg]
  );

  async function onAsk(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setAnswer("");
    setBusy(true);

    try {
      const reply = await askAboutMovie({
        question,
        movieContext: {
          title: props.title,
          genres: props.genres,
          runtimeMins: props.runtimeMins,
          topCast: props.topCast,
          plot: props.plot,
        },
      });
      setAnswer(reply);
    } catch (e: any) {
      setError(e?.message || "Something went wrong while generating an answer.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mt: 3,
        bgcolor: "#1f1f1f",     // << grey background
        color: "#fff",          // << white text
        borderRadius: 2,
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ color: "inherit" }}>
          Ask about this movie
        </Typography>

        {modelLoadingMsg && (
          <Stack direction="row" spacing={1} alignItems="center">
            <CircularProgress size={20} />
            <Typography variant="body2" sx={{ color: "inherit" }}>
              {modelLoadingMsg}
            </Typography>
          </Stack>
        )}

        {!modelLoadingMsg && !modelReady && !error && (
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
            Preparing the AI… (This only happens once per session.)
          </Typography>
        )}

        {error && (
          <Typography variant="body2" sx={{ color: "#ff8080" }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={onAsk}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label='Type your question'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={!!modelLoadingMsg}
              size="small"
              variant="outlined"
              sx={{
                // input + label text white
                "& .MuiInputBase-input": { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#fff" },
                // white outline (default, hover, focus)
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#fff" },
                  "&:hover fieldset": { borderColor: "#fff" },
                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                },
              }}
            />
           <Button
  type="submit"
  variant="contained"
  disabled={disabled}
  sx={{
    bgcolor: "#01B4E4",
    color: "#000",
    textTransform: "none",
    fontWeight: 700,
    "&:hover": { bgcolor: "#0198C2" },

    // keep visual style even when disabled
    "&.Mui-disabled": {
      bgcolor: "#01B4E4",
      color: "#000",
      opacity: 1,            // remove default dim
      boxShadow: "none",
    },
  }}
>
  {busy ? "Thinking…" : "Ask"}
</Button>


          </Stack>
        </Box>

        {busy && (
          <Stack direction="row" spacing={1} alignItems="center">
            <CircularProgress size={20} />
            <Typography variant="body2" sx={{ color: "inherit" }}>
              Generating answer…
            </Typography>
          </Stack>
        )}

        {!!answer && (
          <Box>
            <Typography variant="subtitle2" sx={{ color: "inherit" }} gutterBottom>
              AI Answer
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", color: "inherit" }}>
              {answer}
            </Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}
