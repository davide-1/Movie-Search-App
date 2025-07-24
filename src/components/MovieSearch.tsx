
import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Box } from '@mui/material'

type FormValues = {
  query: string
}

type MovieSearchProps = {
  onSearch: (query: string) => void
}

export default function MovieSearch({ onSearch }: MovieSearchProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    onSearch(data.query)
    reset()
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'center' }}
    >
      <TextField
        label="Search Movies"
        variant="outlined"
        {...register('query', {
          required: 'This field is required',
          minLength: {
            value: 2,
            message: 'Minimum 2 characters',
          },
        })}
        error={!!errors.query}
        helperText={errors.query?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  )
}
