import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";

type FormValues = {
  query: string;
};

type MovieSearchProps = {
  onSearch: (query: string) => void;
};

export default function MovieSearch({ onSearch }: MovieSearchProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    onSearch(data.query);
    reset();
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
      <TextField
  label="Search Movies"
  variant="outlined"
  size="small"
  fullWidth
  sx={{
    maxWidth: { xs: "100%", sm: 300 },
    input: { color: "white" },
    label: { color: "white" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "#90caf9",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1976d2",
      },
    },
    "& .MuiFormHelperText-root": {
      color: "#f44336",
    },
  }}
  {...register("query", {
    required: "This field is required",
    minLength: {
      value: 2,
      message: "Minimum 2 characters",
    },
  })}
  error={!!errors.query}
  helperText={errors.query?.message}
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


