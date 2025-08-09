import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react'

type Movie = {
  id: number
  title: string
  release_date: string
  vote_average: number
  poster_path: string | null
}

type Action = { type: 'TOGGLE_FAVORITE'; payload: Movie }


// Reducer function to add or remove movies from favorites
function favoritesReducer(state: Movie[], action: Action): Movie[] {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      // Check if movie already exists in favorites
      const exists = state.find((m) => m.id === action.payload.id)
      if (exists) {
        // Remove it if it already exists (unfavorite)
        return state.filter((m) => m.id !== action.payload.id)
      } else {
         // Add it to favorites
        return [...state, action.payload]
      }
    default:
      return state
  }
}

type FavoritesContextType = {
  favorites: Movie[]
  toggleFavorite: (movie: Movie) => void
}

// Create the context (initially undefined to enforce usage inside provider)
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Load from localStorage on init
  const stored = localStorage.getItem('favorites')
  const initialFavorites: Movie[] = stored ? JSON.parse(stored) : []

  // Manage state with useReducer
  const [favorites, dispatch] = useReducer(favoritesReducer, initialFavorites)

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

   // Dispatch toggle action
  const toggleFavorite = (movie: Movie) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: movie })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}


