import React, { useState } from 'react'
import Header from './components/Header'
import MovieSearch from './components/MovieSearch'
import MovieGrid from './components/MovieGrid'
import { useSearchMovies } from './hooks/useSearchMovies'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: movies, isLoading, error } = useSearchMovies(searchTerm)

  const handleSearch = (query: string) => {
    setSearchTerm(query)
  }

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: '#fff' }}>
      <Header favoriteCount={0} />
      <MovieSearch onSearch={handleSearch} />

      {isLoading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && <p style={{ textAlign: 'center' }}>Error loading movies</p>}

      {movies && <MovieGrid movies={movies} />}
    </div>
  )
}

export default App

