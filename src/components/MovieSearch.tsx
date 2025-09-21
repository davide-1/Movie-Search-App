
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Autocomplete,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useSearchSuggestions } from "../hooks/useSearchSuggestions";

type FormValues = { query: string };
type Suggestion = { id: number | string; label: string };

type MovieSearchProps = {
  onSearch: (query: string) => void;
  defaultValue?: string; // prefill from ?q=
};

export default function MovieSearch({ onSearch, defaultValue = "" }: MovieSearchProps) {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm<FormValues>({ defaultValues: { query: defaultValue } });

  const [inputValue, setInputValue] = useState<string>(defaultValue);

  // Always pass a string to the hook
  const { data: rawOptions = [], isLoading } = useSearchSuggestions(inputValue || "");

  // 1) Normalize to { id, label }
  const normalized: Suggestion[] = rawOptions.map((opt: any, i: number) =>
    typeof opt === "string"
      ? { id: `s-${i}-${opt.toLowerCase()}`, label: opt }
      : {
          id:
            opt.id ??
            `o-${i}-${String(opt.label ?? opt.title ?? "").toLowerCase()}`,
          label:
            typeof opt.label === "string"
              ? opt.label
              : String(opt.label ?? opt.title ?? ""),
        }
  );

  // 2) Case-insensitive de-duplication by label
  const seen = new Set<string>();
  const options: Suggestion[] = normalized.filter(({ label }) => {
    const k = label.trim().toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  const onSubmit = (data: FormValues) => {
    const q = (data.query ?? "").trim();
    if (!q) return;
    onSearch(q);
    reset({ query: "" });
    setInputValue("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        mt: 4,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        px: 2,
      }}
    >
      <Controller
        name="query"
        control={control}
        rules={{
          required: "This field is required",
          minLength: { value: 2, message: "Minimum 2 characters" },
        }}
        render={({ fieldState }) => (
          <Autocomplete<Suggestion, false, false, true>
            freeSolo
            fullWidth
            options={options} // deduped + normalized
            getOptionLabel={(opt) =>
              typeof opt === "string" ? opt : opt.label
            }
            isOptionEqualToValue={(a, b) => {
              const aId = typeof a === "string" ? a : a.id;
              const bId = typeof b === "string" ? b : (b as any).id;
              if (aId !== undefined && bId !== undefined) return aId === bId;
              const aLabel = typeof a === "string" ? a : a.label;
              const bLabel = typeof b === "string" ? b : (b as any).label;
              return aLabel === bLabel;
            }}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            )}
            loading={isLoading}
            inputValue={inputValue}
            onInputChange={(_, v) => {
              setInputValue(v);
              setValue("query", v, { shouldValidate: true });
            }}
            onChange={(_, val) => {
              const label = typeof val === "string" ? val : val?.label ?? "";
              setInputValue(label);
              setValue("query", label, { shouldValidate: true });
            }}
            onClose={(_, reason) => {
              if (reason === "selectOption") {
                const q = (getValues("query") || "").trim();
                if (q) {
                  onSearch(q);
                  reset({ query: "" });
                  setInputValue("");
                }
              }
            }}
            noOptionsText={
              inputValue.length < 2
                ? "Type at least 2 characters"
                : "No matches"
            }
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: 300 },

              // ==== Dark / Netflix-like input styling ====
              // Text & label colors
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
              "& .MuiInputLabel-root.Mui-focused": { color: "rgba(255,255,255,0.85)" },

              // Outlined border states
              "& .MuiOutlinedInput-root": {
                color: "white",
                // Remove blue focus glow
                boxShadow: "none",
                "&:hover": { boxShadow: "none" },
                "&.Mui-focused": { boxShadow: "none" },

                // Border colors
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.3)",   // default border
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255,255,255,0.5)",   // hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(255,255,255,0.85)",  // focus border (no blue)
                },
              },

              // Some browsers add an outline to the input element itself—kill it
              "& input": { outline: "none !important" },

              // Clear icon color
              "& .MuiAutocomplete-clearIndicator": {
                color: "#b0b0b0",
                "&:hover": { color: "#ffffff" },
              },
            }}
            slotProps={{
              popper: { sx: { zIndex: 1300 } },
              paper: {
                sx: {
                  bgcolor: "#0b0b0b",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.15)",
                },
              },
              listbox: {
                sx: {
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                  "& .MuiAutocomplete-option": {
                    "&.Mui-focused": {
                      backgroundColor: "rgba(144,202,249,0.15)",
                    },
                    "&[aria-selected='true']": {
                      backgroundColor: "rgba(25,118,210,0.25)",
                    },
                  },
                },
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Movies"
                variant="outlined"
                size="small"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{
                  "& .MuiFormHelperText-root": { color: "#f44336" },
                }}
                InputProps={{
                  ...params.InputProps,
                  // Ensure no default blue ring sneaks in
                  style: { outline: "none" },
                  endAdornment: (
                    <>
                      {isLoading ? <CircularProgress size={20} /> : null}
                      {params.InputProps?.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        size="small"
        sx={{
          width: { xs: "100%", sm: "auto" },
          minWidth: 100,
          bgcolor: "rgba(109,109,110,0.7)",
          color: "white",
          fontWeight: 600,
          textTransform: "none",
          borderRadius: "999px",
          "&:hover": {
            bgcolor: "rgba(109,109,110,0.9)",
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
}
