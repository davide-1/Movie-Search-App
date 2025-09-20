
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

type MovieSearchProps = { onSearch: (query: string) => void };

export default function MovieSearch({ onSearch }: MovieSearchProps) {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { query: "" } });

  const [inputValue, setInputValue] = useState("");
  const { data: options = [], isLoading } = useSearchSuggestions(inputValue);

  const onSubmit = (data: FormValues) => {
    const q = data.query.trim();
    if (!q) return;
    onSearch(q);
    reset();
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
            options={options}
            getOptionLabel={(opt) => (typeof opt === "string" ? opt : opt.label)}
            isOptionEqualToValue={(a, b) => a.id === b.id}
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
                  reset();
                  setInputValue("");
                }
              }
            }}
            noOptionsText={
              inputValue.length < 2 ? "Type at least 2 characters" : "No matches"
            }
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: 300 },
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "#90caf9" },
                "&.Mui-focused fieldset": { borderColor: "#1976d2" },
              },
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiAutocomplete-clearIndicator": {
                color: "#b0b0b0", 
                "&:hover": { color: "#ffffff" },
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
                // ✅ This is still the correct way to handle adornments in renderInput
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoading ? <CircularProgress size={20} /> : null}
                      {params.InputProps?.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            slotProps={{
              popper: { sx: { zIndex: 1300 } },
              paper: {
                sx: {
                  bgcolor: "#0b0b0b",
                  color: "white",
                  border: "1px solid #90caf9",
                },
              },
              listbox: {
                sx: {
                  // Hide scrollbar
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
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        size="small"
        sx={{ width: { xs: "100%", sm: "auto" }, minWidth: 100 }}
      >
        Search
      </Button>
    </Box>
  );
}
